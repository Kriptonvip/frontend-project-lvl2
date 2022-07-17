import _ from 'lodash';

const compare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  // объединяем два массива, и сортируем по алфавиту.
  const keysUnion = _.sortBy([...new Set([...keys1, ...keys2])]);
  const compareArr = keysUnion.reduce((acc, key) => {
    const object1Value = object1[key];
    const object2Value = object2[key];
    // если значение одного и того же ключа в обеих структурах — объект (но не массив),
    // то запускаем рекурсию.
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      const object = {
        [key]: {
          children: compare(object1Value, object2Value),
        },
      };
      return { ...acc, ...object };
    }
    // если есть в обоих и совпадает
    if (object1Value === object2Value) {
      const object = {
        [key]: {
          state: 'unchanged',
          value: object1Value,
        },
      };
      return { ...acc, ...object };
    }
    // если есть оба значения и они не равны.
    if (_.has(object1, key) && _.has(object2, key)) {
      const object = {
        [key]: {
          state: 'changed',
          oldValue: object1Value,
          newValue: object2Value,
        },
      };
      return { ...acc, ...object };
    }
    // если есть в первом но не совпадают значения, добавляем ключ:знач - из первого.
    if (_.has(object1, key)) {
      const object = {
        [key]: {
          state: 'old',
          value: object1Value,
        },
      };
      return { ...acc, ...object };
    }
    // если есть во втором но не совпадают значения, добавляем ключ:знач - из второго.
    if (_.has(object2, key)) {
      const object = {
        [key]: {
          state: 'added',
          value: object2Value,
        },
      };
      return { ...acc, ...object };
    }
    return acc;
  }, {});
  // console.log(JSON.stringify(compareArr, null, '   '));
  return compareArr;
};

export default compare;
