import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const isEqual = (object1, object2) => {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);
  const [match, first, second] = ['  ', '- ', '+ '];
  const isKeyObject = (object1, object2, prop) => (_.isPlainObject(object1[prop]) && _.isPlainObject(object2[prop]));
  const propMatch = (object1, object2, prop) => (_.has(object1, prop) && object2[prop] === object1[prop])
  let compareArr = props1.reduce((acc, prop) => {
  // если значение одного и того же ключа в обеих структурах — объект (но не массив),
  // то запускаем рекурсию.
    if (isKeyObject(object1, object2, prop)) {
      acc[`${prop}${match}`] = isEqual(object1[prop], object2[prop]);
      return acc;
    }
    if (propMatch(object1, object2, prop)) {
      acc[`${prop}${match}`] = object1[prop];
      return acc;
    }
    acc[`${prop}${first}`] = object1[prop];
    return acc;
  }, {});
  compareArr = props2.reduce((acc, prop) => {
    if (isKeyObject(object1, object2, prop) || propMatch(object1, object2, prop)) {
      return acc;
    }
    acc[`${prop}${second}`] = object2[prop];
    return acc;
  }, compareArr);
  return compareArr;
  //return Object.entries(compareArr).sort();
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
const compare = (filepath1, filepath2) => {
  const file1 = filePath(filepath1);
  const file2 = filePath(filepath2);
  console.log(isEqual(file1, file2));
  return isEqual(file1, file2);
};

export default compare;
