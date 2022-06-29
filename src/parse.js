import fs from 'fs';
import YAML from 'yaml';

const parse = (filePath, fileName) => {
  const file = fs.readFileSync(filePath, 'utf8');

  if (fileName.endsWith('json')) {
    return JSON.parse(file);
  }
  if (fileName.endsWith('yaml') || fileName.endsWith('yml')) {
    return YAML.parse(file);
  }
  return Error('File path or extension is wrong');
};

export default parse;
