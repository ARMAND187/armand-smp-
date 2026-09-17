const fs = require('fs');
let css = fs.readFileSync('app/globals.css', 'utf8');

const newCSS = `
/* -------------------------------------------------------
   3D BUTTON VARIANTS (TgButton in ProductSection)
------------------------------------------------------- */
.btn-3d-blue {
  background: linear-gradient(180deg, #60A5FA 0%, #2563EB 100%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 4px 10px rgba(37, 99, 235, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.btn-3d-blue:hover {
  background: linear-gradient(180deg, #93C5FD 0%, #3B82F6 100%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 8px 20px rgba(37, 99, 235, 0.5);
}
.btn-3d-blue:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(37, 99, 235, 0.2);
}

.btn-3d-red {
  background: linear-gradient(180deg, #F87171 0%, #DC2626 100%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 4px 10px rgba(220, 38, 38, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.btn-3d-red:hover {
  background: linear-gradient(180deg, #FCA5A5 0%, #EF4444 100%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 8px 20px rgba(220, 38, 38, 0.5);
}
.btn-3d-red:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(220, 38, 38, 0.2);
}

.btn-3d-sky {
  background: linear-gradient(180deg, #38BDF8 0%, #0284C7 100%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 4px 10px rgba(2, 132, 199, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.btn-3d-sky:hover {
  background: linear-gradient(180deg, #7DD3FC 0%, #0EA5E9 100%);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -3px 0 rgba(0, 0, 0, 0.2), 0 8px 20px rgba(2, 132, 199, 0.5);
}
.btn-3d-sky:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(2, 132, 199, 0.2);
}

.btn-3d-ghost {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-3d-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 20px rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.25);
}
.btn-3d-ghost:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.btn-3d-base {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.btn-3d-base:hover {
  transform: translateY(-2px);
}
.btn-3d-base:active {
  transform: translateY(2px);
}
`;

fs.writeFileSync('app/globals.css', css + '\\n' + newCSS);
console.log('done');
