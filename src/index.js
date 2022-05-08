import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import diff from './formatters/index.js';
import compare from './compare.js';

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  const file = fs.readFileSync(filePath, 'utf8');
  // объясните пожалуйста зачем строки 11 - 18 выносить в отдельный модуль?
  // Получается надо сделать функцию определения формата, потом функцию парсер
  // которая вернёт данные, или оставить как есть эти 7 строк, всё ради абстрагирования?
  if (fileName.endsWith('.json')) {
    return JSON.parse(file);
  }
  if (fileName.endsWith('.yaml') || fileName.endsWith('.yml')) {
    return YAML.parse(file);
  }
  return Error('File path or extension is wrong');
};

const genDiff = (filepath1, filepath2, formatName) => {
  const file1 = getData(filepath1);
  const file2 = getData(filepath2);
  const data = compare(file1, file2);
  const result = diff(data, formatName);
  console.log(result);
  return result;
};

export default genDiff;
