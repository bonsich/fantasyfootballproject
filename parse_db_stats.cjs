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

async function parseStats() {
    const client = await pool.connect();
    const outputLines = [];
    
    try {
        const res = await client.query('SELECT p.espn_id, p.name, p.position, g.gamelog_data FROM players p JOIN gamelogs g ON p.espn_id = g.espn_id;');
        
        if (res.rows.length === 0) {
            console.log("No players found.");
            return;
        }

        res.rows.forEach(row => {
            const rawPos = (row.position || '').toUpperCase();
            let displayPos = rawPos;
            if (rawPos === 'FB') {
                displayPos = 'RB';
            }

            const gamelog = row.gamelog_data;
            let playerTeam = 'Unknown';

            if (gamelog && gamelog.events) {
                const eventKeys = Object.keys(gamelog.events);
                for (let i = 0; i < eventKeys.length; i++) {
                    const meta = gamelog.events[eventKeys[i]];
                    if (meta && meta.team && meta.team.abbreviation) {
                        playerTeam = meta.team.abbreviation;
                        break;
                    }
                }
            }

            outputLines.push(`\n========================================`);
            outputLines.push(`Player: ${row.name} | Team: ${playerTeam} | Pos: ${displayPos}`);
            outputLines.push(`========================================`);

            if (!gamelog || !gamelog.seasonTypes) return;

            const statNames = gamelog.names || [];
            const eventsMeta = gamelog.events || {};

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

                        const meta = eventsMeta[event.eventId] || {};
                        const rawDate = meta.gameDate || event.gameDate || event.date || '';
                        let formattedDate = 'Date TBD';
                        if (rawDate) {
                            formattedDate = rawDate.split('T')[0];
                        }

                        let weekInfo = '';
                        if (meta.week) {
                            weekInfo = ` | Week ${meta.week}`;
                        } else if (event.week) {
                            weekInfo = ` | Week ${event.week}`;
                        }

                        let opponentInfo = '';
                        if (meta.opponent && meta.opponent.abbreviation) {
                            const vsOrAt = meta.atVs || 'vs';
                            opponentInfo = ` | ${vsOrAt} ${meta.opponent.abbreviation}`;
                        } else if (event.opponent && event.opponent.abbreviation) {
                            opponentInfo = ` | vs ${event.opponent.abbreviation}`;
                        }

                        outputLines.push(`  [Game ID: ${event.eventId}]${weekInfo} | Date: ${formattedDate}${opponentInfo}`);

                        if (displayPos === 'QB') {
                            outputLines.push(`  Comp/Att: ${gameStats.completions || 0}/${gameStats.passingAttempts || 0}`);
                            outputLines.push(`  Pass Yds: ${gameStats.passingYards || 0}`);
                            outputLines.push(`  Pass TDs: ${gameStats.passingTouchdowns || 0}`);
                            outputLines.push(`  INTs: ${gameStats.interceptions || 0}`);
                            outputLines.push(`  Rush Yds: ${gameStats.rushingYards || 0}`);
                        } else if (displayPos === 'RB' || displayPos === 'FB' || displayPos === 'WR' || displayPos === 'TE') {
                            outputLines.push(`  Rush Att: ${gameStats.rushingAttempts || 0}`);
                            outputLines.push(`  Rush Yds: ${gameStats.rushingYards || 0}`);
                            outputLines.push(`  Receptions: ${gameStats.receptions || 0}`);
                            outputLines.push(`  Rec Yds: ${gameStats.receivingYards || 0}`);
                            outputLines.push(`  TDs: ${gameStats.touchdowns || 0}`);
                        } else if (displayPos === 'K') {
                            const fgMade = gameStats.fieldGoalsMade || 0;
                            const fgAtt = gameStats.fieldGoalAttempts || 0;
                            const xpMade = gameStats.extraPointsMade || 0;
                            const xpAtt = gameStats.extraPointAttempts || 0;
                            const longFg = gameStats.longFieldGoalMade || 0;
                            const totalPts = gameStats.totalKickingPoints || gameStats.points || 0;

                            outputLines.push(`  FG Made/Att: ${fgMade}/${fgAtt}`);
                            outputLines.push(`  Long FG: ${longFg}`);
                            outputLines.push(`  XP Made/Att: ${xpMade}/${xpAtt}`);
                            outputLines.push(`  Kicking Pts: ${totalPts}`);
                        } else {
                            outputLines.push(`  Stats loaded.`);
                        }
                    });
                });
            });
        });

        const outputPath = path.join(__dirname, 'parsed_stats.txt');
        fs.writeFileSync(outputPath, outputLines.join('\n'));
        console.log(`Saved player stats to ${outputPath}`);

    } catch (err) {
        console.error("Database error:", err);
    } finally {
        client.release();
        await pool.end();
    }
}

parseStats();
