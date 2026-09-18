-- Applied to Supabase as migration 20260918063218.
revoke all privileges on table public.leaderboards from anon, authenticated;
grant select, insert, update on table public.leaderboards to anon;

revoke execute on function private.stamp_leaderboard_update() from public, anon, authenticated;
revoke execute on function private.valid_leaderboard_payload(jsonb) from public, authenticated;
revoke execute on function private.valid_leaderboard_token() from public, authenticated;
grant execute on function private.valid_leaderboard_payload(jsonb) to anon;
grant execute on function private.valid_leaderboard_token() to anon;

create or replace function private.valid_leaderboard_payload(payload jsonb)
returns boolean
language plpgsql
immutable
strict
set search_path = ''
as $$
declare
  category text;
  item jsonb;
  seen_ranks integer[];
  category_names constant text[] := array[
    'money', 'pul', 'kills', 'deaths', 'bounty', 'duels', 'playtime'
  ];
begin
  if jsonb_typeof(payload) is distinct from 'object'
    or octet_length(payload::text) > 32768
    or jsonb_typeof(payload -> 'server') is distinct from 'object'
    or jsonb_typeof(payload #> '{server,online}') is distinct from 'number'
    or jsonb_typeof(payload #> '{server,max}') is distinct from 'number'
    or coalesce(payload #>> '{server,online}', '') !~ '^[0-9]{1,6}$'
    or coalesce(payload #>> '{server,max}', '') !~ '^[0-9]{1,6}$'
    or (payload #>> '{server,online}')::integer > (payload #>> '{server,max}')::integer
  then
    return false;
  end if;

  foreach category in array category_names loop
    seen_ranks := array[]::integer[];
    if jsonb_typeof(payload -> category) is distinct from 'array'
      or jsonb_array_length(payload -> category) > 10
    then
      return false;
    end if;

    for item in select value from jsonb_array_elements(payload -> category) loop
      if jsonb_typeof(item) is distinct from 'object'
        or jsonb_typeof(item -> 'rank') is distinct from 'number'
        or coalesce(item ->> 'rank', '') !~ '^([1-9]|10)$'
        or (item ->> 'rank')::integer = any(seen_ranks)
        or jsonb_typeof(item -> 'name') is distinct from 'string'
        or length(coalesce(item ->> 'name', '')) not between 1 and 32
        or btrim(coalesce(item ->> 'name', ''), E' \t\n\r') = ''
        or jsonb_typeof(item -> 'value') is distinct from 'string'
        or length(coalesce(item ->> 'value', '')) not between 1 and 64
        or btrim(coalesce(item ->> 'value', ''), E' \t\n\r') = ''
      then
        return false;
      end if;
      seen_ranks := array_append(seen_ranks, (item ->> 'rank')::integer);
    end loop;
  end loop;

  return true;
exception
  when others then
    return false;
end;
$$;

-- Abort the migration if tightening validation would reject the saved snapshot.
do $$
begin
  if exists (select 1 from public.leaderboards where not private.valid_leaderboard_payload(data)) then
    raise exception 'Existing leaderboard data does not pass validation';
  end if;
end;
$$;
