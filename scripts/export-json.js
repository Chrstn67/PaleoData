// scripts/export-json.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFile = path.join(__dirname, '../public/data.json');

// ⚠️ Import depuis data.js (qui ré-exporte ton .jsx)
import * as dataModule from '../src/data/data.js';

const animals = dataModule.animals || dataModule.default || [];

fs.writeFileSync(jsonFile, JSON.stringify(animals, null, 2), 'utf-8');

console.log(`✅ Généré: public/data.json (${animals.length} animaux)`);
