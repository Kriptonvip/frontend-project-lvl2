import diff from './formatters/index.js';
import compare from './compare.js';
import getData from './parse.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const data = compare(file1, file2);
  const result = diff(data, formatName);
  return result;
};

export default genDiff;
