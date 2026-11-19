const app = document.querySelector('#app');
const toastNode = document.querySelector('#toast');

const navItems = [
  ['dashboard', '⌂', 'Home'],
  ['draft', '♟', 'Draft Room'],
  ['roster', '▤', 'My Roster'],
  ['players', '▥', 'Players & Stats'],
  ['standings', '♜', 'Standings'],
  ['settings', '☷', 'League Settings'],
];

const draftPool = [
  { name: 'Garrett Wilson', team: 'NYJ', pos: 'WR', adp: '36.4', bye: 12, rank: 'WR14', proj: 221.3, initials: 'GW' },
  { name: 'Kenneth Walker III', team: 'SEA', pos: 'RB', adp: '38.1', bye: 8, rank: 'RB15', proj: 204.8, initials: 'KW' },
  { name: 'Drake London', team: 'ATL', pos: 'WR', adp: '39.0', bye: 5, rank: 'WR16', proj: 216.0, initials: 'DL' },
  { name: 'Lamar Jackson', team: 'BAL', pos: 'QB', adp: '40.2', bye: 7, rank: 'QB3', proj: 338.5, initials: 'LJ' },
  { name: 'Trey McBride', team: 'ARI', pos: 'TE', adp: '42.7', bye: 8, rank: 'TE4', proj: 162.9, initials: 'TM' },
  { name: 'DeVonta Smith', team: 'PHI', pos: 'WR', adp: '43.1', bye: 9, rank: 'WR18', proj: 188.2, initials: 'DS' },
  { name: 'Isiah Pacheco', team: 'KC', pos: 'RB', adp: '44.0', bye: 10, rank: 'RB18', proj: 197.1, initials: 'IP' },
];

const initialLineup = [
  { slot: 'QB', name: 'Josh Allen', initials: 'JA', detail: 'BUF · QB', matchup: 'vs MIA · Final', projected: '22.4', points: '28.6', pos: 'QB' },
  { slot: 'RB', name: 'Bijan Robinson', initials: 'BR', detail: 'ATL · RB', matchup: '@ TB · Q3 4:12', projected: '18.1', points: '14.2', pos: 'RB' },
  { slot: 'RB', name: 'De’Von Achane', initials: 'DA', detail: 'MIA · RB · Tap a bench player to swap', matchup: '@ BUF · Final', projected: '16.9', points: '8.3', pos: 'RB' },
  { slot: 'WR', name: 'Ja’Marr Chase', initials: 'JC', detail: 'CIN · WR', matchup: 'vs PIT · Q2 8:40', projected: '17.6', points: '11.9', pos: 'WR' },
  { slot: 'WR', name: 'Amon-Ra St. Brown', initials: 'AS', detail: 'DET · WR', matchup: '@ GB · 4:25 PM', projected: '16.2', points: '0.0', pos: 'WR' },
  { slot: 'TE', name: 'Sam LaPorta', initials: 'SL', detail: 'DET · TE', matchup: '@ GB · 4:25 PM', projected: '10.4', points: '0.0', pos: 'TE' },
  { slot: 'FLEX', name: 'Puka Nacua', initials: 'PN', detail: 'LAR · WR', matchup: 'vs SEA · Final', projected: '15.8', points: '21.3', pos: 'WR' },
  { slot: 'K', name: 'Brandon Aubrey', initials: 'BA', detail: 'DAL · K', matchup: 'vs ATL · 8:20 PM', projected: '9.1', points: '0.0', pos: 'K' },
  { slot: 'DEF', name: 'Steelers D/ST', initials: 'PI', detail: 'PIT · DEF', matchup: '@ CIN · Q2 8:40', projected: '7.4', points: '5.0', pos: 'DEF' },
];

const initialBench = [
  { name: 'R. Stevenson', initials: 'RS', pos: 'RB', detail: 'NE · RB · vs IND', points: '11.2' },
  { name: 'J. Smith-Njigba', initials: 'JS', pos: 'WR', detail: 'SEA · WR · @ LAR', points: '14.6' },
  { name: 'Jake Ferguson', initials: 'JF', pos: 'TE', detail: 'DAL · TE · vs ATL', points: '6.3' },
  { name: 'Jayden Daniels', initials: 'JD', pos: 'QB', detail: 'WAS · QB · Bye', points: '—' },
  { name: 'Tank Dell', initials: 'TD', pos: 'WR', detail: 'HOU · WR · vs JAX', points: '2.0' },
];

const leagueTeams = [
  { team: 'Gridiron Gang', owner: 'Chris B.', initials: 'GG', w: 7, l: 1, pf: 1101.2, pa: 902.4, streak: 'W4', form: 'WWLWW' },
  { team: 'Cache Me Outside', owner: 'You', initials: 'CM', w: 6, l: 2, pf: 1042.6, pa: 941.3, streak: 'W3', form: 'LWWWW', you: true },
  { team: 'Mahomes Alone', owner: 'Daulton R.', initials: 'MA', w: 5, l: 3, pf: 998.4, pa: 960.1, streak: 'L1', form: 'WWLWL' },
  { team: 'Hurts Don’t It', owner: 'Alex K.', initials: 'HD', w: 5, l: 3, pf: 987.0, pa: 955.8, streak: 'W1', form: 'LWLWW' },
  { team: 'Lamb Chops', owner: 'Maya T.', initials: 'LC', w: 4, l: 4, pf: 951.7, pa: 948.2, streak: 'L2', form: 'WWWLL' },
  { team: 'Kupp of Joe', owner: 'Ryan P.', initials: 'KJ', w: 4, l: 4, pf: 934.9, pa: 970.5, streak: 'W2', form: 'LLLWW' },
  { team: 'Tua Legit', owner: 'Sam W.', initials: 'TL', w: 3, l: 5, pf: 902.3, pa: 988.0, streak: 'L1', form: 'WLWWL' },
  { team: 'Bijan Mustard', owner: 'Jordan L.', initials: 'BM', w: 3, l: 5, pf: 889.6, pa: 1001.7, streak: 'W1', form: 'LLLLW' },
  { team: 'Waddle Waddle', owner: 'Priya S.', initials: 'WW', w: 2, l: 6, pf: 861.4, pa: 1012.9, streak: 'L3', form: 'WLLLL' },
  { team: 'Jameson Love', owner: 'Ethan M.', initials: 'JL', w: 1, l: 7, pf: 822.0, pa: 1049.4, streak: 'L5', form: 'LLLLL' },
];

const state = {
  view: 'login',
  authMode: 'login',
  draftFilter: 'All',
  draftQuery: '',
  draftPlayers: [...draftPool],
  draftQueue: [],
  drafted: [
    { name: 'Josh Allen', pos: 'QB', team: 'Cache Me Outside', round: 'Round 1 · Pick 1.07' },
    { name: 'Bijan Robinson', pos: 'RB', team: 'Cache Me Outside', round: 'Round 2 · Pick 2.04' },
    { name: 'Ja’Marr Chase', pos: 'WR', team: 'Cache Me Outside', round: 'Round 3 · Pick 3.07' },
  ],
  pickNo: 4,
  seconds: 42,
  lineup: [...initialLineup],
  bench: [...initialBench],
  watched: false,
  scoringMode: 'Half-PPR',
  leaderboard: 'Head-to-Head Record',
  settingsTab: 'Scoring',
  standingsMode: 'H2H Record',
  scores: [25, 4, -2, 10, 6, 0.5, -2],
  slots: [1, 2, 2, 1, 1, 1, 1, 6],
  settingsSaved: true,
};

let toastTimer;
let draftTimer;

const html = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const badge = (pos) => `<span class="pill pos-${html(pos)}">${html(pos)}</span>`;
const moneyButton = (text, action, extra = '') => `<button class="btn ${extra}" data-action="${action}">${text}</button>`;

function notify(message) {
  toastNode.textContent = message;
  toastNode.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastNode.classList.remove('show'), 2600);
}

function setView(view) {
  state.view = view;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function sidebar() {
  return `<aside class="sidebar">
    <div class="brand"><span class="brand-mark">ϟ</span><div class="brand-copy"><div class="brand-name">CACHE MONEY</div><div class="brand-sub">Fantasy Football</div></div></div>
    <div class="league-switcher"><div class="eyebrow">Current League</div><div class="league-name">Dragon Week League</div><div class="league-meta">Week 9 · 10 teams · H2H</div></div>
    <div class="nav-label">Menu</div>
    <nav class="side-nav" aria-label="Main navigation">${navItems.map(([id, icon, label]) => `<button class="nav-item ${state.view === id ? 'active' : ''}" data-view="${id}" aria-current="${state.view === id ? 'page' : 'false'}"><span class="nav-icon" aria-hidden="true">${icon}</span><span class="nav-copy">${label}</span></button>`).join('')}</nav>
    <div class="waiver-card"><div class="eyebrow">Waivers close in</div><div class="waiver-clock">1d 14h 22m</div><div class="waiver-note">3 claims pending</div></div>
    <div class="profile"><div class="avatar">PN</div><div class="profile-copy"><div class="profile-name">Prashastha N.</div><div class="profile-team">Cache Me Outside</div></div><button class="signout" data-action="signout" aria-label="Sign out">↪</button></div>
  </aside>`;
}

function topbar() {
  return `<header class="topbar"><label class="search-wrap"><span class="search-icon" aria-hidden="true">⌕</span><input id="global-search" class="search-input" type="search" placeholder="Search players, teams..." aria-label="Search players and teams" value="${state.globalSearch ? html(state.globalSearch) : ''}"></label><button class="icon-button" data-action="notifications" aria-label="Notifications">♧<span class="notification-dot"></span></button><div class="avatar top-avatar">PN</div></header>`;
}

function shell(content) {
  return `<div class="app-shell">${sidebar()}<div class="workspace">${topbar()}${content}</div></div>`;
}

function heading(title, subtitle = '') {
  return `<div class="page-heading"><h1>${title}</h1>${subtitle ? `<div class="page-subtitle">${subtitle}</div>` : ''}</div>`;
}

function metric(label, value, note, noteClass = '') {
  return `<article class="panel metric-card"><div class="eyebrow">${label}</div><div class="metric-value">${value}</div><div class="metric-note ${noteClass}">${note}</div></article>`;
}

function playerRow(player, options = {}) {
  const action = options.action || 'noop';
  const actionText = options.actionText || '↔';
  return `<div class="player-row ${options.highlight ? 'highlight' : ''}">${badge(player.pos)}<div><div class="player-name">${html(player.name)}</div><div class="player-detail">${html(player.detail || `${player.team} · ${player.pos}`)}</div></div><div class="player-opponent">${html(player.matchup || '')}</div><div class="player-points">${html(player.points || '')}</div><button class="row-action" data-action="${action}" ${options.index != null ? `data-index="${options.index}"` : ''} aria-label="${options.actionLabel || 'Swap player'}">${actionText}</button></div>`;
}

function dashboard() {
  const starters = state.lineup.slice(0, 5).map((p) => playerRow(p, { action: 'player-details', actionText: '↗', actionLabel: `View ${p.name}` })).join('');
  const topThree = leagueTeams.slice(0, 5).map((t, i) => `<div class="standing-mini-row"><span class="rank">${i + 1}</span><div><div class="standing-team">${html(t.team)}</div><div class="standing-owner">${html(t.owner)}</div></div><div><div class="standing-record">${t.w}–${t.l}</div><div class="standing-points">${t.pf.toLocaleString('en-US',{minimumFractionDigits:1})}</div></div></div>`).join('');
  return shell(`${heading('Home Dashboard', 'Dragon Week League · Week 9')}
    <section class="dash-top">
      <article class="panel matchup">
        <div class="matchup-status"><span class="live-dot"></span><b>LIVE</b><span>4 games in progress · 6 players left to play</span><button class="text-link" data-view="roster">View matchup →</button></div>
        <div class="matchup-sides">
          <div class="team-block"><div class="team-logo">CM</div><div class="team-name">Cache Me Outside</div><div class="team-record">You · 6–2</div><div class="hero-score">112.4</div><div class="team-proj">Proj 128.9</div></div>
          <div class="versus">VS</div>
          <div class="team-block"><div class="team-logo">MA</div><div class="team-name">Mahomes Alone</div><div class="team-record">Daulton R. · 5–3</div><div class="hero-score">98.7</div><div class="team-proj">Proj 116.2</div></div>
        </div>
        <div class="winprob-label"><span>Win probability</span><span>64% – 36%</span></div><div class="progress-track"><span class="progress-you"></span><span class="progress-opponent"></span></div>
      </article>
      <div class="mini-stat-list"><article class="panel stat-card"><div class="stat-label">Season points</div><div class="stat-number">1,042.6</div><div class="stat-foot">↑ 2nd in league</div></article><article class="panel stat-card"><div class="stat-label">This week</div><div class="stat-number">112.4</div><div class="stat-foot">6 players left</div></article><article class="panel stat-card"><div class="stat-label">Waiver rank</div><div class="stat-number">#3</div><div class="stat-foot">3 claims pending</div></article></div>
    </section>
    <section class="dashboard-grid dashboard-panels">
      <article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Your Starters</h2><button class="text-link" data-view="roster">Edit lineup →</button></div><div class="starter-list">${starters}</div></article>
      <article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Standings</h2><button class="text-link" data-view="standings">Full table →</button></div><div class="standings-mini">${topThree}</div></article>
    </section>`);
}

function draftPickStrip() {
  const future = [
    { number: '4.04', player: 'DK Metcalf', team: 'Gridiron Gang', pos: 'WR' },
    { number: '4.05', player: 'Jalen Hurts', team: 'Mahomes Alone', pos: 'QB' },
    { number: '4.06', player: 'Travis Kelce', team: 'Hurts Don’t It', pos: 'TE' },
  ];
  return `<div class="pick-strip">${future.map((p) => `<div class="pick-card"><div class="pick-number">${p.number} ${badge(p.pos)}</div><div class="pick-player">${p.player}</div><div class="pick-team">${p.team}</div></div>`).join('')}<div class="pick-card on-clock-card"><div class="pick-number">4.07</div><div class="pick-player">On the clock</div><div class="pick-team">Cache Me Outside</div></div><div class="pick-card next-card"><div class="pick-number">4.08</div><div class="pick-player">Up next</div><div class="pick-team">Lamb Chops</div></div><div class="pick-card"><div class="pick-number">4.09</div><div class="pick-player">—</div><div class="pick-team">Kupp of Joe</div></div><div class="pick-card"><div class="pick-number">4.10</div><div class="pick-player">—</div><div class="pick-team">Tua Legit</div></div><div class="pick-card"><div class="pick-number">5.01</div><div class="pick-player">—</div><div class="pick-team">Tua Legit</div></div></div>`;
}

function filteredDraftPlayers() {
  const query = state.draftQuery.trim().toLowerCase();
  return state.draftPlayers.filter((p) => (state.draftFilter === 'All' || p.pos === state.draftFilter) && (!query || `${p.name} ${p.team} ${p.pos}`.toLowerCase().includes(query)));
}

function draftRows() {
  const players = filteredDraftPlayers();
  if (!players.length) return '<div class="empty-state">No players match that search.</div>';
  return players.map((p, i) => `<div class="draft-player ${i === 0 ? 'featured' : ''}">${badge(p.pos)}<div class="draft-identity"><div class="player-avatar" style="display:inline-grid;margin-right:10px;vertical-align:middle">${p.initials}</div><span class="player-name">${html(p.name)}</span><div class="player-detail">${html(p.team)} · ${html(p.pos)}</div></div><span class="draft-adp">ADP ${p.adp} · Bye ${p.bye}</span><span class="draft-rank">${p.rank}</span><span class="draft-projection">${p.proj.toFixed(1)}</span><button class="row-action" data-action="queue-player" data-player="${html(p.name)}" aria-label="Add ${html(p.name)} to queue">↔</button></div>`).join('');
}

function draft() {
  const queue = state.draftQueue.length;
  const previous = state.drafted.slice(-3).map((p, i) => `<div class="pick-list-item">${badge(p.pos)}<div><div class="player-name">${html(p.name)}</div><div class="player-detail">${html(p.round)}</div></div><span class="pick-success">✓</span></div>`).join('');
  const emptyCount = Math.max(0, 12 - state.drafted.length);
  const slots = Array.from({ length: Math.min(emptyCount, 7) }, (_, i) => `<div class="pick-list-item empty-slot">${badge(['RB','WR','TE','FLEX','K','DEF','BN'][i % 7])}<div class="player-detail">Empty slot</div></div>`).join('');
  const filters = ['All','QB','RB','WR','TE','K','DEF'];
  return shell(`${heading('Live Draft', 'Snake draft · Round 4 of 15 · Pick 37 of 150')}
    <section class="draft-banner"><div><div class="on-clock"><span class="live-dot"></span> &nbsp;YOU’RE ON THE CLOCK</div><h2 class="draft-pick-title">Cache Me Outside · Pick 4.07</h2><div class="draft-hint">Best available: ${html(state.draftPlayers[0]?.name || 'Draft complete')} · ${html(state.draftPlayers[1]?.name || '—')}</div></div><div class="timer-block"><div class="timer">${String(Math.floor(state.seconds / 60)).padStart(2,'0')}:${String(state.seconds % 60).padStart(2,'0')}</div><div class="timer-caption">seconds left</div></div><div class="draft-actions"><button class="btn" data-action="auto-pick">Auto-pick</button><button class="btn btn-primary" data-action="draft-player" ${state.draftPlayers.length ? '' : 'disabled'}>Draft Player</button></div></section>
    ${draftPickStrip()}
    <section class="draft-grid"><article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Available Players</h2><span class="queue-count">Queue (${queue})</span></div><div class="section-head" style="margin-bottom:12px"><div class="filter-row">${filters.map((f) => `<button class="filter-pill ${state.draftFilter === f ? 'selected' : ''}" data-filter="${f}">${f}</button>`).join('')}</div><input class="inline-search" id="draft-search" type="search" placeholder="⌕  Search players" value="${html(state.draftQuery)}" aria-label="Search available players"></div><div class="table-head"><span>Pos</span><span>Player</span><span>ADP · Bye</span><span>Rank</span><span>Proj</span><span></span></div><div id="draft-player-rows">${draftRows()}</div></article><aside class="panel panel-pad"><div class="section-head"><h2 class="section-title">My Picks</h2><span class="queue-count">${state.drafted.length} / 15</span></div><div class="my-picks">${previous}${slots}</div></aside></section>`);
}

function rosterLineup() {
  return state.lineup.map((p, index) => `<div class="lineup-row">${badge(p.slot)}<div class="player-avatar">${p.initials}</div><div><div class="player-name">${html(p.name)}</div><div class="player-detail">${html(p.detail)}</div><div class="player-opponent">${html(p.matchup)}</div></div><div class="player-proj">${p.projected}</div><div class="player-points">${p.points}</div><button class="row-action" data-action="swap-lineup" data-index="${index}" aria-label="Swap ${html(p.name)}">↔</button></div>`).join('');
}

function benchRows() {
  if (!state.bench.length) return '<div class="empty-state">Your bench is clear.</div>';
  return state.bench.map((p, index) => `<div class="bench-row ${index === 1 ? 'ready' : ''}">${badge(p.pos)}<div><div class="player-name">${html(p.name)}</div><div class="player-detail">${html(p.detail)}</div></div><div class="bench-score">${p.points}</div><button class="btn ${index === 1 ? 'btn-primary' : ''}" data-action="start-bench" data-index="${index}">${index === 1 ? '⌃ Start' : '↔ Swap'}</button></div>`).join('');
}

function roster() {
  return shell(`${heading('My Roster', 'Cache Me Outside · Lineup locks Sun 1:00 PM ET')}
    <section class="metric-grid">${metric('Projected','128.9','▲ 12.7 vs opponent')}${metric('Week 9 points','112.4','6 players yet to play')}${metric('Bench points','34.1','Left on your bench')}${metric('Moves left','6 / 10','Resets Wednesday 3 AM')}</section>
    <section class="roster-layout"><article class="panel roster-main"><div class="section-head"><h2 class="section-title">Starting Lineup</h2><div style="display:flex;gap:9px"><button class="btn" data-action="add-player">+ Add Player</button><button class="btn btn-primary" data-action="save-lineup">Save Lineup</button></div></div><div class="roster-group">${rosterLineup()}</div></article><aside class="roster-side"><article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Bench</h2><span class="queue-count">${state.bench.length} / 6</span></div><div class="roster-group">${benchRows()}</div></article><article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Waiver Wire</h2><button class="text-link" data-view="players">See all →</button></div><div class="waiver-list"><div class="waiver-row">${badge('WR')}<div><div class="player-name">Rashod Bateman</div><div class="player-detail">BAL · WR · 41% rostered</div></div><span class="trend">+12%</span><button class="btn btn-primary" data-action="waiver-add" data-name="Rashod Bateman" data-pos="WR">+ Add</button></div><div class="waiver-row">${badge('RB')}<div><div class="player-name">Tyjae Spears</div><div class="player-detail">TEN · RB · 33% rostered</div></div><span class="trend">+9%</span><button class="btn btn-primary" data-action="waiver-add" data-name="Tyjae Spears" data-pos="RB">+ Add</button></div><div class="waiver-row">${badge('TE')}<div><div class="player-name">Cade Otton</div><div class="player-detail">TB · TE · 28% rostered</div></div><span class="trend">+6%</span><button class="btn btn-primary" data-action="waiver-add" data-name="Cade Otton" data-pos="TE">+ Add</button></div></div></article></aside></section>`);
}

const weekPoints = [18.2,24.6,12.1,31.4,19.8,22.3,0,27.9,11.9];
function chartBars() {
  const max = 34;
  return weekPoints.map((value, i) => `<div class="chart-column"><span class="chart-value">${value ? value.toFixed(1) : 'BYE'}</span><div class="chart-bar ${i === 3 ? 'best' : ''} ${i === 8 ? 'current' : ''}" style="height:${value ? Math.max(4, value / max * 78) : 3}%"></div><span class="chart-week">W${i + 1}</span></div>`).join('');
}

function playerStats() {
  const gameLog = [
    ['9','vs PIT','4','61','0','11.9'], ['8','@ PHI','8','118','1','27.9'], ['7','BYE','—','—','—','—'], ['6','vs NYG','6','103','1','22.3'], ['5','@ BAL','7','98','1','19.8'], ['4','vs DEN','9','164','2','31.4'], ['3','@ WAS','5','71','0','12.1'],
  ];
  return shell(`${heading('Player Stats', 'Ja’Marr Chase · WR · Cincinnati Bengals')}
    <section class="panel player-profile"><div class="player-portrait">JC</div><div><div class="player-badges">${badge('WR')}<span class="pill">CIN · #1</span><span class="pill">WR3 overall</span><span class="pill">Rostered · Gridiron Gang</span></div><h2>Ja’Marr Chase</h2><div class="player-season-stats"><div class="player-season-stat"><span class="eyebrow">Season pts</span><strong class="positive">168.4</strong></div><div class="player-season-stat"><span class="eyebrow">Avg / game</span><strong>21.1</strong></div><div class="player-season-stat"><span class="eyebrow">Targets</span><strong>82</strong></div><div class="player-season-stat"><span class="eyebrow">Rec yds</span><strong>912</strong></div><div class="player-season-stat"><span class="eyebrow">TD</span><strong>8</strong></div><div class="player-season-stat"><span class="eyebrow">Snap %</span><strong>94%</strong></div></div></div><div class="player-profile-actions"><button class="btn btn-primary" data-action="trade">Propose Trade</button><button class="btn btn-ghost" data-action="watchlist">${state.watched ? '✓ On Watchlist' : 'Add to Watchlist'}</button></div></section>
    <section class="player-analysis"><article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Weekly Fantasy Points</h2><button class="text-link" data-action="scoring-toggle">${state.scoringMode}</button></div><div class="chart-legend"><span><i class="legend-dot best"></i>Best week</span><span><i class="legend-dot"></i>Game</span><span>◻ Season avg 21.1</span></div><div class="chart">${chartBars()}</div></article><article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Game Log</h2><button class="text-link" data-action="full-log">Full log →</button></div><div class="game-log"><div class="log-head"><span>WK</span><span>OPP</span><span>REC</span><span>YDS</span><span>TD</span><span>PTS</span></div>${gameLog.map((r) => `<div class="log-row ${r[0] === '4' ? 'best-log' : ''}">${r.map((v) => `<span>${v}</span>`).join('')}</div>`).join('')}</div></article></section>
    <section class="team-stat-grid"><div class="section-head"><h2 class="section-title">Team Stats · Cache Me Outside</h2><button class="text-link" data-action="compare">Compare with another team →</button></div><div class="metric-grid">${metric('Points for','1,042.6','▲ 2nd most in league')}${metric('Points against','941.3','5th toughest schedule')}${metric('Avg / week','130.3','▲ 10.5 vs league avg')}${metric('Best week','151.2','Week 4 vs Lamb Chops')}</div></section>`);
}

const scoringRules = [
  ['Passing yards','Passing · yds per point',25], ['Passing touchdown','Passing · points',4], ['Interception thrown','Passing · points',-2], ['Rushing yards','Rushing · yds per point',10], ['Rushing or receiving TD','Rush / Rec · points',6], ['Reception','Receiving · points',0.5], ['Fumble lost','Misc · points',-2],
];
const rosterSlots = [['QB','Quarterback'],['RB','Running back'],['WR','Wide receiver'],['TE','Tight end'],['FLEX','RB / WR / TE'],['K','Kicker'],['DEF','Team defense'],['BN','Bench']];

function tabButton(tab) {
  return `<button class="filter-pill ${state.settingsTab === tab ? 'selected' : ''}" data-settings-tab="${tab}">${tab}</button>`;
}

function leaderboardMode() {
  return `<article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Leaderboard Mode</h2><span class="muted" style="font-size:10px">Locked after Week 1</span></div><div class="mode-cards"><button class="mode-card ${state.leaderboard === 'Head-to-Head Record' ? 'selected' : ''}" data-leaderboard="Head-to-Head Record"><span class="radio"></span><span><span class="mode-name">Head-to-Head Record</span><div class="mode-description">Face one opponent each week. Standings rank by W–L record, with points-for as the tiebreaker.</div></span></button><button class="mode-card ${state.leaderboard === 'Total Points' ? 'selected' : ''}" data-leaderboard="Total Points"><span class="radio"></span><span><span class="mode-name">Total Points</span><div class="mode-description">Every point counts. Standings rank by cumulative season points, no weekly matchups.</div></span></button></div><div class="select-grid">${[['League size','10 teams','8 teams|10 teams|12 teams|14 teams'],['Regular season','14 weeks','13 weeks|14 weeks|15 weeks'],['Playoff teams','4 teams','4 teams|6 teams|8 teams'],['Trade deadline','Week 11','Week 9|Week 10|Week 11|Week 12']].map(([label, value, options]) => `<label><span class="field-label">${label}</span><select class="select-control" aria-label="${label}">${options.split('|').map((o) => `<option ${o === value ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`).join('')}</div></article>`;
}

function scoringPanel() {
  return `<article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Scoring Rules</h2><span class="muted" style="font-size:10px">${state.scoringMode} preset</span></div><div class="segmented" style="display:grid;grid-template-columns:repeat(4,1fr);width:100%;margin-bottom:7px">${['Standard','Half-PPR','Full PPR','Custom'].map((mode) => `<button class="${state.scoringMode === mode ? 'selected' : ''}" data-scoring-mode="${mode}">${mode}</button>`).join('')}</div><div class="scoring-list">${scoringRules.map(([name, sub], i) => `<div class="score-row"><div><div class="score-name">${name}</div><div class="score-sub">${sub}</div></div><div class="stepper"><button data-adjust="score" data-index="${i}" data-delta="-1" aria-label="Decrease ${name}">−</button><output>${state.scores[i]}</output><button data-adjust="score" data-index="${i}" data-delta="1" aria-label="Increase ${name}">+</button></div></div>`).join('')}</div></article>`;
}

function slotsPanel() {
  return `<article class="panel panel-pad"><div class="section-head"><h2 class="section-title">Roster Slots</h2><span class="muted" style="font-size:10px">${state.slots.reduce((a,b)=>a+b,0)} total</span></div><div class="slot-list">${rosterSlots.map(([pos, label], i) => `<div class="slot-row">${badge(pos)}<span>${label}</span><div class="stepper"><button data-adjust="slot" data-index="${i}" data-delta="-1" aria-label="Remove ${label}">−</button><output>${state.slots[i]}</output><button data-adjust="slot" data-index="${i}" data-delta="1" aria-label="Add ${label}">+</button></div></div>`).join('')}</div></article>`;
}

function settingsContent() {
  switch (state.settingsTab) {
    case 'Roster Slots': return `<section class="settings-layout">${slotsPanel()}<article class="panel panel-pad"><h2 class="section-title">Lineup Format</h2><p class="mode-description" style="margin:12px 0 20px">Set how many players each team starts at every position. Bench slots hold players outside your starting lineup.</p>${leaderboardMode()}</article></section>`;
    case 'General': return `<section class="settings-layout"><article class="panel panel-pad"><div class="section-head"><h2 class="section-title">League Details</h2></div><label class="form-field"><span class="field-label">League name</span><input class="select-control" value="Dragon Week League"></label><div class="select-grid"><label><span class="field-label">League size</span><select class="select-control"><option>10 teams</option><option>12 teams</option></select></label><label><span class="field-label">Privacy</span><select class="select-control"><option>Invite only</option><option>Public</option></select></label></div><div class="settings-note">League changes apply starting next week.</div></article><article class="panel panel-pad"><h2 class="section-title">Commissioner</h2><div class="standing-mini-row" style="margin-top:12px"><div class="avatar">PN</div><div><div class="standing-team">Prashastha N.</div><div class="standing-owner">League commissioner</div></div></div></article></section>`;
    case 'Draft': return `<section class="settings-layout"><article class="panel panel-pad"><h2 class="section-title">Draft Settings</h2><div class="select-grid">${[['Draft type','Snake draft'],['Draft date','Aug 24 · 7:00 PM'],['Pick timer','90 seconds'],['Order','Randomized']].map(([a,b])=>`<label><span class="field-label">${a}</span><select class="select-control"><option>${b}</option></select></label>`).join('')}</div></article><article class="panel panel-pad"><h2 class="section-title">Draft Room</h2><p class="mode-description" style="margin-top:12px">Managers can queue players, use auto-pick, and view the live pick order during the draft.</p><button class="btn btn-primary" style="margin-top:14px" data-view="draft">Open Draft Room</button></article></section>`;
    case 'Playoffs': return `<section class="settings-layout"><article class="panel panel-pad"><h2 class="section-title">Playoff Format</h2><div class="select-grid">${[['Playoff teams','4 teams'],['Start week','Week 15'],['Matchup length','1 week'],['Seeding tiebreaker','Points for']].map(([a,b])=>`<label><span class="field-label">${a}</span><select class="select-control"><option>${b}</option></select></label>`).join('')}</div></article><article class="panel panel-pad"><h2 class="section-title">Playoff Bracket</h2><p class="mode-description" style="margin-top:12px">The top four teams qualify. Seeds are set by league standings when the regular season ends.</p></article></section>`;
    case 'Members': return `<section class="panel panel-pad" style="margin-top:18px"><div class="section-head"><h2 class="section-title">League Members</h2><button class="btn btn-primary" data-action="invite">+ Invite Member</button></div><div class="standings-mini">${leagueTeams.map((t,i)=>`<div class="standing-mini-row"><div class="avatar" style="width:32px;height:32px;background:${i===1?'var(--lime)':'var(--panel-soft)'};color:${i===1?'#11140b':'var(--text)'}">${t.initials}</div><div><div class="standing-team">${t.owner}${t.you?' · You':''}</div><div class="standing-owner">${t.team}${i===0?' · Commissioner':''}</div></div><span class="muted">Active</span></div>`).join('')}</div></section>`;
    default: return `<section>${leaderboardMode()}<div class="settings-layout">${scoringPanel()}${slotsPanel()}</div></section>`;
  }
}

function settings() {
  return shell(`${heading('League Settings', 'Commissioner tools · Changes apply starting next week')}<div class="settings-toolbar">${['General','Scoring','Roster Slots','Draft','Playoffs','Members'].map(tabButton).join('')}<span class="spacer"></span><button class="btn btn-ghost" data-action="discard-settings">Discard</button><button class="btn btn-primary settings-save" data-action="save-settings">${state.settingsSaved ? 'Save Changes' : 'Save Changes ·'}</button></div>${settingsContent()}`);
}

function standings() {
  const rows = [...leagueTeams].sort((a,b) => state.standingsMode === 'Total Points' ? b.pf - a.pf : (b.w - a.w) || b.pf - a.pf);
  const podium = rows.slice(0,3).map((team, i) => `<article class="panel podium-card ${team.you ? 'you' : ''}"><div class="rank-number">${i + 1}</div><div><span class="pill">${['League leader','2nd place','3rd place'][i]}</span><strong>${html(team.team)}</strong><div class="player-detail">${team.you ? 'You' : html(team.owner)} · ${team.pf.toLocaleString('en-US',{minimumFractionDigits:1})} PF</div></div><div class="record">${team.w}–${team.l}</div></article>`).join('');
  const tableRows = rows.map((t,i) => `<tr class="${t.you ? 'you' : ''}"><td>${i + 1}</td><td><div class="team-cell"><span class="team-monogram">${t.initials}</span><div><div class="player-name">${html(t.team)}</div><div class="player-detail">${t.you ? 'You' : html(t.owner)}</div></div></div></td><td>${t.w}–${t.l}</td><td class="mono">${t.pf.toLocaleString('en-US',{minimumFractionDigits:1})}</td><td class="mono muted">${t.pa.toLocaleString('en-US',{minimumFractionDigits:1})}</td><td class="mono ${(t.pf-t.pa)>=0?'positive':'negative'}">${(t.pf-t.pa>=0?'+':'')+(t.pf-t.pa).toFixed(1)}</td><td class="mono ${(t.streak.startsWith('W')?'positive':'negative')}">${t.streak}</td><td><div class="form-pips">${t.form.split('').map(v=>`<span class="form-pip ${v==='L'?'loss':''}">${v}</span>`).join('')}</div></td></tr>${i === 3 ? '<tr class="playoff-line"><td colspan="8">────────────── &nbsp; Playoff line &nbsp; ──────────────</td></tr>' : ''}`).join('');
  return shell(`${heading('Standings', `Dragon Week League · Ranked by ${state.standingsMode === 'Total Points' ? 'total points' : 'head-to-head record'}`)}<section class="grid-3">${podium}</section><section class="panel panel-pad" style="margin-top:22px"><div class="section-head"><h2 class="section-title">League Table</h2><div class="segmented"><button class="${state.standingsMode === 'H2H Record' ? 'selected' : ''}" data-standings-mode="H2H Record">H2H Record</button><button class="${state.standingsMode === 'Total Points' ? 'selected' : ''}" data-standings-mode="Total Points">Total Points</button></div></div><div class="table-wrap"><table class="standings-table"><thead><tr><th>#</th><th>Team</th><th>W–L</th><th>PF</th><th>PA</th><th>Diff</th><th>Streak</th><th>Last 5</th></tr></thead><tbody>${tableRows}</tbody></table></div></section>`);
}

function login() {
  const isSignup = state.authMode === 'signup';
  return `<main class="auth-screen"><section class="auth-hero"><div class="auth-brand"><span class="brand-mark">ϟ</span><div><div class="brand-name">CACHE MONEY</div></div></div><div class="auth-copy"><div class="season-tag"><span class="live-dot"></span>2026 season is live · Week 9</div><h1>DRAFT.<br>TRASH TALK.<br>WIN THE LEAGUE.</h1><p>Build your squad, set your lineup, and watch real NFL stats move the leaderboard every Sunday. Your league, your rules.</p></div><div class="auth-highlights"><span class="highlight-chip"><b>✓</b> Live NFL stats</span><span class="highlight-chip"><b>✓</b> Snake & auction drafts</span><span class="highlight-chip"><b>✓</b> H2H or total points</span><span class="highlight-chip"><b>✓</b> Custom scoring</span></div></section><section class="auth-panel"><div class="auth-form-wrap"><h2>${isSignup ? 'Create Account' : 'Welcome Back'}</h2><p class="auth-intro">${isSignup ? 'Join your league and get your team ready for game day.' : 'Log in to manage your team and check this week’s matchup.'}</p><div class="auth-tabs"><button class="${!isSignup?'active':''}" data-auth-mode="login">Log In</button><button class="${isSignup?'active':''}" data-auth-mode="signup">Sign Up</button></div><form id="auth-form">${isSignup?'<div class="form-field"><label for="auth-name">Name</label><input id="auth-name" class="auth-input" placeholder="Your name" autocomplete="name" required></div>':''}<div class="form-field"><label for="auth-email">Email</label><input id="auth-email" class="auth-input" type="email" placeholder="you@example.com" autocomplete="email" required></div><div class="form-field"><label for="auth-password">Password</label><input id="auth-password" class="auth-input" type="password" placeholder="Enter your password" autocomplete="${isSignup?'new-password':'current-password'}" required minlength="8"></div>${isSignup?'<div class="auth-extras"><label class="check-label"><input type="checkbox" required> I agree to the league terms</label></div>':`<div class="auth-extras"><label class="check-label"><input type="checkbox" checked> Remember me</label><button type="button" class="text-link" data-action="forgot-password">Forgot password?</button></div>`}<button class="btn btn-primary auth-submit" type="submit">${isSignup?'Create Account':'Log In'}</button></form><div class="auth-divider">or</div><button class="btn btn-ghost auth-submit" data-action="google-login">Continue with Google</button><div class="auth-footer">${isSignup?'Already have an account?':'New to Cache Money?'} <button data-auth-mode="${isSignup?'login':'signup'}">${isSignup?'Log in':'Create an account'}</button></div></div></section></main>`;
}

function render() {
  if (state.view === 'login') app.innerHTML = login();
  else if (state.view === 'dashboard') app.innerHTML = dashboard();
  else if (state.view === 'draft') app.innerHTML = draft();
  else if (state.view === 'roster') app.innerHTML = roster();
  else if (state.view === 'players') app.innerHTML = playerStats();
  else if (state.view === 'settings') app.innerHTML = settings();
  else app.innerHTML = standings();
  if (state.view === 'draft') startDraftTimer();
  else clearInterval(draftTimer);
}

function startDraftTimer() {
  clearInterval(draftTimer);
  draftTimer = setInterval(() => {
    if (state.view !== 'draft') return clearInterval(draftTimer);
    state.seconds = state.seconds > 0 ? state.seconds - 1 : 90;
    const timer = document.querySelector('.timer');
    if (timer) timer.textContent = `${String(Math.floor(state.seconds / 60)).padStart(2,'0')}:${String(state.seconds % 60).padStart(2,'0')}`;
  }, 1000);
}

function updateDraftRows() {
  const target = document.querySelector('#draft-player-rows');
  if (target) target.innerHTML = draftRows();
}

function draftPlayer(player) {
  const idx = state.draftPlayers.findIndex((p) => p.name === player);
  if (idx < 0) return;
  const picked = state.draftPlayers.splice(idx, 1)[0];
  state.drafted.push({ name: picked.name, pos: picked.pos, team: 'Cache Me Outside', round: `Round 4 · Pick 4.${String(state.pickNo).padStart(2,'0')}` });
  state.pickNo += 1;
  state.seconds = 90;
  render();
  notify(`${picked.name} drafted to Cache Me Outside`);
}

function swapBenchToLineup(benchIndex, lineIndex = -1) {
  const benchPlayer = state.bench[benchIndex];
  if (!benchPlayer) return;
  const targetIndex = lineIndex >= 0 ? lineIndex : state.lineup.findIndex((p) => p.pos === benchPlayer.pos);
  if (targetIndex < 0) return notify(`No ${benchPlayer.pos} slot is available to swap.`);
  const [outgoing] = state.lineup.splice(targetIndex, 1, { ...benchPlayer, slot: state.lineup[targetIndex].slot, detail: benchPlayer.detail, matchup: 'Lineup update · Ready', projected: '—' });
  state.bench.splice(benchIndex, 1, { name: outgoing.name, initials: outgoing.initials, pos: outgoing.pos, detail: outgoing.detail, points: outgoing.points });
  render();
  notify(`${benchPlayer.name} moved into your lineup`);
}

function doAction(action, element) {
  switch (action) {
    case 'notifications': notify('You’re all caught up.'); break;
    case 'signout': setView('login'); notify('You’ve signed out of this demo.'); break;
    case 'forgot-password': notify('Password reset will be available when authentication is connected.'); break;
    case 'google-login': setView('dashboard'); notify('Demo mode · Google sign-in is not connected yet.'); break;
    case 'save-lineup': notify('Lineup saved in this demo.'); break;
    case 'auto-pick': if (state.draftPlayers[0]) draftPlayer(state.draftPlayers[0].name); break;
    case 'draft-player': if (state.draftPlayers[0]) draftPlayer(state.draftPlayers[0].name); break;
    case 'queue-player': {
      const name = element.dataset.player;
      state.draftQueue = state.draftQueue.includes(name) ? state.draftQueue.filter((n) => n !== name) : [...state.draftQueue, name];
      render();
      notify(`${name} ${state.draftQueue.includes(name) ? 'added to' : 'removed from'} your queue`);
      break;
    }
    case 'start-bench': swapBenchToLineup(Number(element.dataset.index)); break;
    case 'swap-lineup': {
      const lineIndex = Number(element.dataset.index);
      const pos = state.lineup[lineIndex]?.pos;
      const benchIndex = state.bench.findIndex((p) => p.pos === pos);
      if (benchIndex >= 0) swapBenchToLineup(benchIndex, lineIndex);
      else notify(`No bench ${pos} is available to swap.`);
      break;
    }
    case 'waiver-add': {
      if (state.bench.length >= 6) return notify('Your bench is full. Drop a player before adding another.');
      state.bench.push({ name: element.dataset.name, initials: element.dataset.name.split(' ').map((x) => x[0]).join('').slice(0,2), pos: element.dataset.pos, detail: `FA · ${element.dataset.pos} · Added from waivers`, points: '—' });
      render();
      notify(`${element.dataset.name} added to your bench`);
      break;
    }
    case 'add-player': setView('players'); notify('Choose a player to add to your roster.'); break;
    case 'watchlist': state.watched = !state.watched; render(); notify(state.watched ? 'Ja’Marr Chase added to your watchlist' : 'Removed from your watchlist'); break;
    case 'trade': notify('Trade proposals will be available when league actions are connected.'); break;
    case 'full-log': notify('Showing the latest available game log.'); break;
    case 'compare': notify('Team comparisons are coming soon.'); break;
    case 'scoring-toggle': state.scoringMode = state.scoringMode === 'Half-PPR' ? 'Full PPR' : 'Half-PPR'; render(); break;
    case 'save-settings': state.settingsSaved = true; notify('League settings saved in this demo.'); render(); break;
    case 'discard-settings': state.settingsSaved = true; notify('Unsaved changes discarded.'); render(); break;
    case 'invite': notify('Member invitations will be available when league accounts are connected.'); break;
    case 'player-details': setView('players'); break;
  }
}

app.addEventListener('click', (event) => {
  const view = event.target.closest('[data-view]');
  if (view) return setView(view.dataset.view);
  const authMode = event.target.closest('[data-auth-mode]');
  if (authMode) { state.authMode = authMode.dataset.authMode; render(); return; }
  const filter = event.target.closest('[data-filter]');
  if (filter) { state.draftFilter = filter.dataset.filter; render(); return; }
  const settingTab = event.target.closest('[data-settings-tab]');
  if (settingTab) { state.settingsTab = settingTab.dataset.settingsTab; render(); return; }
  const leaderboard = event.target.closest('[data-leaderboard]');
  if (leaderboard) { state.leaderboard = leaderboard.dataset.leaderboard; state.settingsSaved = false; render(); return; }
  const scoring = event.target.closest('[data-scoring-mode]');
  if (scoring) { state.scoringMode = scoring.dataset.scoringMode; state.settingsSaved = false; render(); return; }
  const mode = event.target.closest('[data-standings-mode]');
  if (mode) { state.standingsMode = mode.dataset.standingsMode; render(); return; }
  const adjust = event.target.closest('[data-adjust]');
  if (adjust) {
    const type = adjust.dataset.adjust;
    const index = Number(adjust.dataset.index);
    const target = type === 'score' ? state.scores : state.slots;
    const min = type === 'slot' && index !== 7 ? 0 : -Infinity;
    target[index] = Math.max(min, target[index] + Number(adjust.dataset.delta) * (type === 'score' && index === 5 ? 0.5 : 1));
    state.settingsSaved = false;
    render();
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action) doAction(action.dataset.action, action);
});

app.addEventListener('submit', (event) => {
  if (event.target.id === 'auth-form') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    setView('dashboard');
    notify(`Welcome to Cache Money${state.authMode === 'signup' ? ' — your account is ready' : ' — demo mode'}.`);
  }
});

app.addEventListener('input', (event) => {
  if (event.target.id === 'draft-search') {
    state.draftQuery = event.target.value;
    updateDraftRows();
  }
});

app.addEventListener('keydown', (event) => {
  if (event.target.id === 'global-search' && event.key === 'Enter') {
    state.globalSearch = event.target.value;
    state.draftQuery = event.target.value;
    setView('players');
    notify(state.globalSearch ? `Showing player stats related to “${state.globalSearch}”` : 'Player stats');
  }
});

render();
