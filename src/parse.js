import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return YAML.parse(data);
    case 'yml':
      return YAML.parse(data);
    default:
      return Error('File path or extension is wrong');
  }
};

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  const file = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).slice(1);
  return parse(file, ext);
};

export default getData;
