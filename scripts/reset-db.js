// Resets api/db.json from the tracked seed file (api/db.seed.json).
// This runs automatically before the API server starts so every test run
// (and every manual `npm run api`) begins from a known, clean state.
const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '..', 'api', 'db.seed.json');
const dbPath = path.join(__dirname, '..', 'api', 'db.json');

fs.copyFileSync(seedPath, dbPath);
console.log('[reset-db] api/db.json restored from api/db.seed.json');
