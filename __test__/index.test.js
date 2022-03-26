import compare from '../src/index.js';

test('check rigth work json', () => {
  const filepath1 = './__fixtures__/file1.json';
  const filepath2 = './__fixtures__/file2.json';
  const correctAnswer = '{ \n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(compare(filepath1, filepath2)).toBe(correctAnswer);
});

test('check rigth work YAML', () => {
  const filepath1 = './__fixtures__/file1.yml';
  const filepath2 = './__fixtures__/file2.yml';
  const correctAnswer = '{ \n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(compare(filepath1, filepath2)).toBe(correctAnswer);
});
