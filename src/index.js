import fs from 'fs';
import path from 'path';
import diff from './formatters/index.js';
import compare from './compare.js';
import parse from './parse.js';

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  const file = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).slice(1);
  return parse(file, ext);
};

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const data = compare(file1, file2);
  const result = diff(data, formatName);
  return result;
};

export default genDiff;
