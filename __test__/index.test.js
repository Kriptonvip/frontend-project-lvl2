import fs from 'fs';
import compare from '../src/index.js';

const fixturesPaths = {
  json: ['./__fixtures__/file1.json', './__fixtures__/file2.json'],
  yml: ['./__fixtures__/file1.yml', './__fixtures__/file2.yml'],
};
const correctAnswer = (formater) => fs.readFileSync(`./__fixtures__/result_${formater}.txt`, 'utf-8').trim();

test.each([
  { formater: 'stylish', ext: 'json' },
  { formater: 'stylish', ext: 'yml' },
  { formater: 'plain', ext: 'json' },
  { formater: 'plain', ext: 'yml' },
  { formater: 'json', ext: 'json' },
])('check formater - "$formater" ext - "$ext"', ({ formater, ext }) => {
  expect(compare(fixturesPaths[ext][0], fixturesPaths[ext][1], formater))
    .toBe(correctAnswer(formater));
});
