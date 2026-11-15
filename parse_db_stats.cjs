const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fantasy_db',
    password: 'abc123',
    port: 5432,
});

async function parseStats() {
    const client = await pool.connect();
    
    try {
        const res = await client.query('SELECT p.espn_id, p.name, p.position, g.gamelog_data FROM players p JOIN gamelogs g ON p.espn_id = g.espn_id;');
        
        if (res.rows.length === 0) {
            console.log("No players found.");
            return;
        }

        res.rows.forEach(row => {
            console.log(`\n========================================`);
            console.log(`Player: ${row.name} | Pos: ${row.position}`);
            console.log(`========================================`);

            const gamelog = row.gamelog_data;
            if (!gamelog || !gamelog.seasonTypes) return;

            const statNames = gamelog.names || [];

            gamelog.seasonTypes.forEach(seasonType => {
                seasonType.categories.forEach(category => {
                    if (!category.events) return;

                    category.events.forEach(event => {
                        const gameStats = {};

                        statNames.forEach((statKey, index) => {
                            if (event.stats && event.stats[index] !== undefined) {
                                gameStats[statKey] = event.stats[index];
                            } else {
                                gameStats[statKey] = 0;
                            }
                        });

                        const pos = (row.position || '').toUpperCase();
                        
                        if (pos === 'QB') {
                            console.log(`  [Game ID: ${event.eventId}]`);
                            console.log(`  Comp/Att: ${gameStats.completions || 0}/${gameStats.passingAttempts || 0}`);
                            console.log(`  Pass Yds: ${gameStats.passingYards || 0}`);
                            console.log(`  Pass TDs: ${gameStats.passingTouchdowns || 0}`);
                            console.log(`  INTs: ${gameStats.interceptions || 0}`);
                            console.log(`  Rush Yds: ${gameStats.rushingYards || 0}`);
                        } else if (['RB', 'WR', 'TE'].includes(pos)) {
                            console.log(`  [Game ID: ${event.eventId}]`);
                            console.log(`  Rush Att: ${gameStats.rushingAttempts || 0}`);
                            console.log(`  Rush Yds: ${gameStats.rushingYards || 0}`);
                            console.log(`  Receptions: ${gameStats.receptions || 0}`);
                            console.log(`  Rec Yds: ${gameStats.receivingYards || 0}`);
                            console.log(`  TDs: ${gameStats.touchdowns || 0}`);
                        } else {
                            console.log(`  [Game ID: ${event.eventId}] Stats loaded.`);
                        }
                    });
                });
            });
        });

    } catch (err) {
        console.error("Database error:", err);
    } finally {
        client.release();
        await pool.end();
    }
}

parseStats();
