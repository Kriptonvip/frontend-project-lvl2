import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  console.log(filePath, 1);
  const file = fs.readFileSync(filePath, 'utf8');
  if (fileName.endsWith('json')) {
    return JSON.parse(file);
  }
  if (fileName.endsWith('yaml') || fileName.endsWith('yml')) {
    return YAML.parse(file);
  }
  return Error('File path or extension is wrong');
};

export default getData;
