import { MOCK_RESULT } from '../data/demoData.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function mockGenerate(moodText, chips, onStep) {
  for (let i = 0; i < 4; i++) {
    await delay(600);
    onStep(i);
  }
  await delay(400);
  return { ...MOCK_RESULT };
}
