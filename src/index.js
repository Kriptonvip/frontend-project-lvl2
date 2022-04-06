import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import diff from './formatters/index.js';
import compare from './compare.js';

const filePath = (filepath) => {
  const rootPath = path.resolve();
  const file = filepath.startsWith(rootPath) ? fs.readFileSync(filepath, 'utf8') : fs.readFileSync(`${rootPath}/${filepath}`, 'utf8');
  if (filepath.endsWith('.json')) {
    return JSON.parse(file);
  }
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) {
    return YAML.parse(file);
  }
  return Error;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = filePath(filepath1);
  const file2 = filePath(filepath2);
  const data = compare(file1, file2);
  return diff(data, formatName);
};

export default genDiff;
