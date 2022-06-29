import path from 'path';
import YAML from 'yaml';
import readFile from './readFile.js';

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  const file = readFile(filePath);
  if (fileName.endsWith('json')) {
    return JSON.parse(file);
  }
  if (fileName.endsWith('yaml') || fileName.endsWith('yml')) {
    return YAML.parse(file);
  }
  return Error('File path or extension is wrong');
};

export default getData;
