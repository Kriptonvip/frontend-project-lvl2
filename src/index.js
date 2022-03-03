import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const isEqual = (object1, object2) => {
  const props1 = Object.getOwnPropertyNames(object1);
  const props2 = Object.getOwnPropertyNames(object2);

  let compareArr1 = props1.reduce((acc, prop) => {
    if (_.has(object2, prop) && object1[prop] === object2[prop]) {
      acc.push(['   ', `${prop}:`, object1[prop]]);
      return acc;
    }
    acc.push(['  -', `${prop}:`, object1[prop]]);
    return acc;
  }, []);
  compareArr1 = props2.reduce((acc, prop) => {
    if (_.has(object1, prop) && object2[prop] === object1[prop]) {
      return acc;
    }
    acc.push(['  -', `${prop}:`, object2[prop]]);
    return acc;
  }, compareArr1);
  // сортируем по алфавиту.
  compareArr1.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    return 1;
  });

  // преобразуем в строку и приводим к требуемому виду.
  const stringArr = `{ \n${compareArr1.join('\n').replaceAll(',', ' ')}\n}`;
  return stringArr;
};
const rootPath = path.resolve();
const filePath = (filepath) => (filepath.startsWith(rootPath) ? fs.readFileSync(filepath, 'utf8') : fs.readFileSync(`${rootPath}/${filepath}`, 'utf8'));
const compare = (filepath1, filepath2) => {
  const file1 = filePath(filepath1);
  const file2 = filePath(filepath2);
  console.log(isEqual(JSON.parse(file1), JSON.parse(file2)));
  return isEqual(JSON.parse(file1), JSON.parse(file2));
};

export default compare;
