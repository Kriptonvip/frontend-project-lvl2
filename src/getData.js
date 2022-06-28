import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const getData = (fileName) => {
  const filePath = path.resolve(fileName);
  console.log(filePath, 1);
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

export default getData;
