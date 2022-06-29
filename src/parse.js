import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const parse = (filePath, ext) => {
  const file = fs.readFileSync(filePath, 'utf8');
  switch (ext) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return YAML.parse(file);
    case 'yml':
      return YAML.parse(file);
    default:
      return Error('File path or extension is wrong');
  }
};

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  const ext = path.extname(filePath).slice(1);
  return parse(filePath, ext);
};

export default getData;
