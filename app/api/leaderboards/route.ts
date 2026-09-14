import { NextResponse } from 'next/server';
import { Rcon } from 'rcon-client';

export const revalidate = 30; // Cache for 30 seconds

export async function GET() {
  try {
    const rcon = await Rcon.connect({
      host: "rawchysmp.com",
      port: 25575,
      password: "rawchy_dev_rcon",
      timeout: 3000
    });

    let placeholders = [];
    
    // Money
    for(let i=1; i<=10; i++) {
        placeholders.push(`%ajlb_lb_vault_eco_balance_${i}_alltime_name%`);
        placeholders.push(`%ajlb_lb_vault_eco_balance_${i}_alltime_value_formatted%`);
    }
    // Pul
    for(let i=1; i<=10; i++) {
        placeholders.push(`%ajlb_lb_playerpoints_points_${i}_alltime_name%`);
        placeholders.push(`%ajlb_lb_playerpoints_points_${i}_alltime_value%`);
    }
    // Kills
    for(let i=1; i<=10; i++) {
        placeholders.push(`%ajlb_lb_statistic_player_kills_${i}_alltime_name%`);
        placeholders.push(`%ajlb_lb_statistic_player_kills_${i}_alltime_value%`);
    }
    // Deaths
    for(let i=1; i<=10; i++) {
        placeholders.push(`%ajlb_lb_statistic_deaths_${i}_alltime_name%`);
        placeholders.push(`%ajlb_lb_statistic_deaths_${i}_alltime_value%`);
    }
    // Bounty
    for(let i=1; i<=10; i++) {
        placeholders.push(`%rawchybounty_top_name_${i}%`);
        placeholders.push(`%rawchybounty_top_amount_${i}%`);
    }
    // Duels
    for(let i=1; i<=10; i++) {
        placeholders.push(`%ajlb_lb_duels_wins_${i}_alltime_name%`);
        placeholders.push(`%ajlb_lb_duels_wins_${i}_alltime_value%`);
    }
    // Playtime
    for(let i=1; i<=10; i++) {
        placeholders.push(`%rawchyplaytime_name_${i}%`);
        placeholders.push(`%rawchyplaytime_time_${i}%`);
    }

    const command = `papi parse .AgedAtol5309 ${placeholders.join('|')}`;
    const response = await rcon.send(command);
    await rcon.end();

    const parts = response.split('|');
    let idx = 0;
    const data = {
        money: [],
        pul: [],
        kills: [],
        deaths: [],
        bounty: [],
        duels: [],
        playtime: []
    };

    const cats = ['money', 'pul', 'kills', 'deaths', 'bounty', 'duels', 'playtime'];
    for (const cat of cats) {
        for (let i=0; i<10; i++) {
            let name = parts[idx++];
            let val = parts[idx++];
            // Clean up empty/unparsed placeholders
            if (name === 'none' || !name || name.startsWith('%')) name = '---';
            if (val === 'none' || !val || val.startsWith('%')) val = '0';
            
            data[cat].push({ rank: i+1, name, value: val });
        }
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
