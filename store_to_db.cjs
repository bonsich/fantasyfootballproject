const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Pool } = require('pg');

const PLAYER_LIMIT = 10000;
const DELAY_MS = 250;
const CSV_FILE_PATH = path.join(__dirname, 'player_ids.csv');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fantasy_db',
    password: 'abc123',
    port: 5432,
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPlayerGamelog(espnId) {
    const url = `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${espnId}/gamelog?season=2026&seasontype=2`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ESPN ID ${espnId}`);
    }
    
    return response.json();
}

async function runIngestion() {
    const client = await pool.connect();
    const playersToFetch = [];

    await new Promise((resolve, reject) => {
        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csv())
            .on('data', (row) => {
                if (row.espn_id && row.espn_id.trim() !== '') {
                    playersToFetch.push({
                        espn_id: row.espn_id.trim(),
                        name: row.espn_name || row.sleeper_name || 'Unknown',
                        position: row.sleeper_position || '',
                        sleeper_id: row.sleeper_id || null,
                        yahoo_id: row.yahoo_id || null
                    });
                }
            })
            .on('end', resolve)
            .on('error', reject);
    });

    const targetList = playersToFetch.slice(0, PLAYER_LIMIT);
    console.log(`Processing ${targetList.length} players into PostgreSQL...`);

    try {
        await client.query('BEGIN');

        for (let i = 0; i < targetList.length; i++) {
            const player = targetList[i];
            
            console.log(`[${i + 1}/${targetList.length}] Saving & Fetching:`);
            console.log(`  Name: ${player.name}`);
            console.log(`  ID: ${player.espn_id}`);

            await client.query(
                `INSERT INTO players (espn_id, name, position, sleeper_id, yahoo_id)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (espn_id) DO UPDATE
                 SET name = EXCLUDED.name, position = EXCLUDED.position;`,
                [player.espn_id, player.name, player.position, player.sleeper_id, player.yahoo_id]
            );

            try {
                const gamelogData = await fetchPlayerGamelog(player.espn_id);

                await client.query(
                    `DELETE FROM gamelogs WHERE espn_id = $1 AND season = $2;`,
                    [player.espn_id, 2026]
                );

                await client.query(
                    `INSERT INTO gamelogs (espn_id, season, gamelog_data) VALUES ($1, $2, $3);`,
                    [player.espn_id, 2026, JSON.stringify(gamelogData)]
                );
            } catch (err) {
                console.log(`  -> Failed fetching API for ${player.name}`);
                console.log(`  -> Error: ${err.message}`);
            }

            await delay(DELAY_MS);
        }

        await client.query('COMMIT');
        console.log("Database ingestion completed successfully!");
        
    } catch (err) {
        await client.query('ROLLBACK');
        console.log("Transaction error, rolled back:");
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

runIngestion().catch(console.error);
