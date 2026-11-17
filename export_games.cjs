const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fantasy_db',
    password: 'abc123',
    port: 5432,
});

async function exportGameInfo() {
    const client = await pool.connect();
    const gamesMap = new Map();

    try {
        const res = await client.query('SELECT p.espn_id, p.name, p.position, g.gamelog_data FROM players p JOIN gamelogs g ON p.espn_id = g.espn_id;');

        if (res.rows.length === 0) {
            console.log("No gamelogs found in database.");
            return;
        }

        res.rows.forEach(row => {
            const gamelog = row.gamelog_data;
            if (!gamelog) return;

            const eventsMeta = gamelog.events || {};

            Object.keys(eventsMeta).forEach(eventId => {
                const meta = eventsMeta[eventId];
                if (!gamesMap.has(eventId)) {
                    const rawDate = meta.gameDate || '';
                    const gameDate = rawDate ? rawDate.split('T')[0] : 'TBD';
                    const week = meta.week || 'N/A';
                    const team = meta.team ? (meta.team.abbreviation || meta.team.displayName || '') : '';
                    const opponent = meta.opponent ? (meta.opponent.abbreviation || meta.opponent.displayName || '') : '';
                    const atVs = meta.atVs || 'vs';
                    const result = meta.gameResult || 'Pending';
                    const score = meta.score || '';

                    gamesMap.set(eventId, {
                        gameId: eventId,
                        week: week,
                        date: gameDate,
                        matchup: `${team} ${atVs} ${opponent}`.trim(),
                        team: team,
                        opponent: opponent,
                        result: result,
                        score: score,
                        playersTracked: []
                    });
                }

                const gameEntry = gamesMap.get(eventId);
                const playerLabel = `${row.name} (${row.position})`;
                if (!gameEntry.playersTracked.includes(playerLabel)) {
                    gameEntry.playersTracked.push(playerLabel);
                }
            });

            if (gamelog.seasonTypes) {
                gamelog.seasonTypes.forEach(seasonType => {
                    seasonType.categories.forEach(category => {
                        if (!category.events) return;

                        category.events.forEach(event => {
                            const eventId = String(event.eventId);
                            if (!gamesMap.has(eventId)) {
                                const rawDate = event.gameDate || event.date || '';
                                const gameDate = rawDate ? rawDate.split('T')[0] : 'TBD';
                                gamesMap.set(eventId, {
                                    gameId: eventId,
                                    week: event.week || 'N/A',
                                    date: gameDate,
                                    matchup: 'Matchup Details Pending',
                                    team: '',
                                    opponent: '',
                                    result: 'Pending',
                                    score: '',
                                    playersTracked: []
                                });
                            }

                            const gameEntry = gamesMap.get(eventId);
                            const playerLabel = `${row.name} (${row.position})`;
                            if (!gameEntry.playersTracked.includes(playerLabel)) {
                                gameEntry.playersTracked.push(playerLabel);
                            }
                        });
                    });
                });
            }
        });

        const gamesList = Array.from(gamesMap.values());
        gamesList.sort((a, b) => {
            if (a.date !== b.date) {
                return a.date.localeCompare(b.date);
            }
            return a.gameId.localeCompare(b.gameId);
        });

        const outputPath = path.join(__dirname, 'games_info.json');
        fs.writeFileSync(outputPath, JSON.stringify(gamesList, null, 2));
        console.log(`Saved ${gamesList.length} games to ${outputPath}`);

    } catch (err) {
        console.error("Database error:", err);
    } finally {
        client.release();
        await pool.end();
    }
}

exportGameInfo();
