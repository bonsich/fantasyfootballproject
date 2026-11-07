const fs = require('fs');
const path = require('path');

const SLEEPER_API_URL = 'https://api.sleeper.app/v1/players/nfl?active=true';
const OUTPUT_CSV_PATH = path.join(__dirname, 'player_ids.csv');

async function fetchSleeperPlayers() {
    console.log("Fetching active NFL players using API");
    try {
        const response = await fetch(SLEEPER_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const playersMap = await response.json();
        const csvRows = ['espn_id,sleeper_name,sleeper_position,team'];
        let count = 0;

        for (const [sleeperId, player] of Object.entries(playersMap)) {
            if (player.espn_id && player.espn_id.toString().trim() !== '') {
                const espnId = player.espn_id.toString().trim();
                const firstName = player.first_name || '';
                const lastName = player.last_name || '';
                const fullName = `${firstName} ${lastName}`.replace(/,/g, '');
                const position = player.position || 'Unknown';
                const team = player.team || 'FA';

                csvRows.push(`${espnId},"${fullName}",${position},${team}`);
                count++;
            }
        }

        fs.writeFileSync(OUTPUT_CSV_PATH, csvRows.join('\n'));
        console.log(`Successfully extracted ${count} players with ESPN IDs to ${OUTPUT_CSV_PATH}`);

    } catch (err) {
        console.error("Failed to fetch players:", err);
    }
}

fetchSleeperPlayers();