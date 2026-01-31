// generateCandidates.js
import { faker } from '@faker-js/faker';
import fs from 'fs';

const candidates = [];

for (let i = 0; i < 40; i++) {
  candidates.push({
    id: i + 1,
    name: faker.person.fullName(),
    experience: faker.number.int({ min: 1, max: 15 }),
    skills: faker.word.words(3),
    crisis_management_score: faker.number.int({ min: 1, max: 10 }),
    sustainability_score: faker.number.int({ min: 1, max: 10 }),
    team_motivation_score: faker.number.int({ min: 1, max: 10 }),
    total_score: faker.number.int({ min: 15, max: 30 })
  });
}

// Save JSON file inside public folder so React can fetch it
fs.writeFileSync('frontend/public/candidates.json', JSON.stringify(candidates, null, 2));
console.log('✅ Generated 40 candidates → frontend/public/candidates.json');
