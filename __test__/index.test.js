import fs from 'fs';
import compare from '../src/index.js';
import plain from '../src/formatters/plain.js';

test('check rigth work json', () => {
  const filepath1 = './__fixtures__/file1.json';
  const filepath2 = './__fixtures__/file2.json';
  const correctAnswer = fs.readFileSync('./__fixtures__/result.txt', 'utf-8');
  expect(compare(filepath1, filepath2)).toBe(correctAnswer);
});
test('check rigth work YAML', () => {
  const filepath1 = './__fixtures__/file1.yml';
  const filepath2 = './__fixtures__/file2.yml';
  const correctAnswer = fs.readFileSync('./__fixtures__/result.txt', 'utf-8');
  expect(compare(filepath1, filepath2)).toBe(correctAnswer);
});
test('check plain text format yml', () => {
  const filepath1 = './__fixtures__/file1.yml';
  const filepath2 = './__fixtures__/file2.yml';
  const correctAnswer = fs.readFileSync('./__fixtures__/plain.txt', 'utf-8');
  expect(compare(filepath1, filepath2, plain)).toBe(correctAnswer);
});
test('check plain text format json', () => {
  const filepath1 = './__fixtures__/file1.json';
  const filepath2 = './__fixtures__/file2.json';
  const correctAnswer = fs.readFileSync('./__fixtures__/plain.txt', 'utf-8');
  expect(compare(filepath1, filepath2, plain)).toBe(correctAnswer);
});
test('check JSON text format json', () => {
  const filepath1 = './__fixtures__/file1.json';
  const filepath2 = './__fixtures__/file2.json';
  const correctAnswer = fs.readFileSync('./__fixtures__/json.txt', 'utf-8');
  expect(compare(filepath1, filepath2, JSON.stringify)).toBe(correctAnswer);
});
test('check JSON text format yml', () => {
  const filepath1 = './__fixtures__/file1.yml';
  const filepath2 = './__fixtures__/file2.yml';
  const correctAnswer = fs.readFileSync('./__fixtures__/json.txt', 'utf-8');
  expect(compare(filepath1, filepath2, JSON.stringify)).toBe(correctAnswer);
});
