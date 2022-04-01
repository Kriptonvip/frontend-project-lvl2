/* eslint-disable implicit-arrow-linebreak */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import stylish from './formatters/stylish.js';

const isEqual = (object1, object2) => {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);
  // объединяем два массива, и сортируем по алфавиту.
  const propsUnion = [...new Set([...props1, ...props2])].sort();
  const [match, first, second] = ['', '- ', '+ '];
  const isKeyObject = (Obj1, Obj2, prop) =>
    (_.isPlainObject(Obj1[prop]) && _.isPlainObject(Obj2[prop]));
  const propMatch = (Obj1, Obj2, prop) =>
    (_.has(Obj1, prop) && Obj1[prop] !== Obj2[prop]);
  const compareArr = propsUnion.reduce((acc, prop) => {
    const object1Value = object1[prop];
    const object2Value = object2[prop];
    // если значение одного и того же ключа в обеих структурах — объект (но не массив),
    // то запускаем рекурсию.
    if (isKeyObject(object1, object2, prop)) {
      acc[`${match}${prop}`] = isEqual(object1Value, object2Value);
      return acc;
    }
    // если есть в первом но нет во втором
    if (propMatch(object1, object2, prop)) {
      acc[`${first}${prop}`] = object1Value;
    }
    // если есть в втором но нет в первом
    if (propMatch(object2, object1, prop)) {
      acc[`${second}${prop}`] = object2Value;
      return acc;
    }
    // если есть в обоих
    if (_.has(object1, prop) && _.has(object2, prop)) {
      acc[`${match}${prop}`] = object1Value;
    }
    return acc;
  }, {});
  return compareArr;
};

const rootPath = path.resolve();
const filePath = (filepath) => {
  const file = filepath.startsWith(rootPath) ? fs.readFileSync(filepath, 'utf8') : fs.readFileSync(`${rootPath}/${filepath}`, 'utf8');
  if (filepath.endsWith('.json')) {
    return JSON.parse(file);
  }
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) {
    return YAML.parse(file);
  }
  return Error;
};

const compare = (filepath1, filepath2, format = stylish) => {
  const file1 = filePath(filepath1);
  const file2 = filePath(filepath2);
  console.log(format(isEqual(file1, file2)));
  return format(isEqual(file1, file2));
};

export default compare;
