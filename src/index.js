/* eslint-disable implicit-arrow-linebreak */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const isEqual = (object1, object2) => {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);
  // объединяем два массива, и сортируем по алфавиту.
  const propsUnion = _.sortBy([...new Set([...props1, ...props2])]);
  const [first, second] = ['- ', '+ '];
  const compareArr = propsUnion.reduce((acc, prop) => {
    const object1Value = object1[prop];
    const object2Value = object2[prop];
    // если значение одного и того же ключа в обеих структурах — объект (но не массив),
    // то запускаем рекурсию.
    if (_.isPlainObject(object1[prop]) && _.isPlainObject(object2[prop])) {
      const object = { [prop]: isEqual(object1Value, object2Value) };
      // match[prop] = isEqual(object1Value, object2Value);
      return { ...acc, ...object };
    }
    // если есть в обоих и совпадает
    if (object1Value === object2Value) {
      const equal = { [prop]: object1Value };
      return { ...acc, ...equal };
    }
    // если есть оба значения и они не равны.
    if (_.has(object1, prop) && _.has(object2, prop)) {
      const object1Match = { [`${first}${prop}`]: object1Value };
      const object2Match = { [`${second}${prop}`]: object2Value };
      return { ...acc, ...object1Match, ...object2Match };
    }
    // если есть в первом но не совпадают значения, добавляем ключ:знач - из первого.
    if (_.has(object1, prop)) {
      const object1Match = { [`${first}${prop}`]: object1Value };
      return { ...acc, ...object1Match };
    }
    // если есть во втором но не совпадают значения, добавляем ключ:знач - из второго.
    if (_.has(object2, prop)) {
      const object2Match = { [`${second}${prop}`]: object2Value };
      return { ...acc, ...object2Match };
    }
    return acc;
  }, {});
  return compareArr;
};

const filePath = (filepath) => {
  const rootPath = path.resolve();
  const file = filepath.startsWith(rootPath) ? fs.readFileSync(filepath, 'utf8') : fs.readFileSync(`${rootPath}/${filepath}`, 'utf8');
  if (filepath.endsWith('.json')) {
    return JSON.parse(file);
  }
  if (filepath.endsWith('.yaml') || filepath.endsWith('.yml')) {
    return YAML.parse(file);
  }
  return Error;
};

const compare = (filepath1, filepath2, formatName) => {
  const file1 = filePath(filepath1);
  const file2 = filePath(filepath2);
  switch (formatName) {
    case 'plain':
      return plain(isEqual(file1, file2));
    case 'json':
      return JSON.stringify(isEqual(file1, file2));
    default:
      return stylish(isEqual(file1, file2));
  }
};

export default compare;
