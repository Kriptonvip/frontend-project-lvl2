import path from 'path';
import parse from './parse.js';

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  return parse(filePath, fileName);
};

export default getData;
