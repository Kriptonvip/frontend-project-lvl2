import _ from 'lodash';

const plain = (value) => {
  const iter = (currentValue, objPath = '') => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    // const path = `${objPath}`;
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const keyUpdate = `+${key.slice(1)}`; // ключ который обновится, или может обновиться.
        const keyRemove = `-${key.slice(1)}`; // для проверки был ли такой же ключ в первом фаиле.
        const keyClean = key.slice(2); // ключ без ориентиров, для итогового вывода.
        const isString = (data) => (typeof data === 'string' ? `'${(data)}'` : `${(data)}`);
        if (key.startsWith('+') && !_.has(currentValue, keyRemove)) { 
          return `Property '${objPath}${keyClean}' was added with value: ${isString(currentValue[key])}`;
        }
        if (key.startsWith('-') && !_.has(currentValue, keyUpdate)) {
          return `Property '${objPath}${keyClean}' was removed`;
        }
        if (key.startsWith('-') && _.has(currentValue, keyUpdate)) {
          return `Property '${objPath}${keyClean}' was updated. From ${isString(val)} to ${isString(currentValue[keyUpdate])}`;
        }
        return iter(val, `${objPath}${key}.`);
      });

    return [...lines]
      .filter((line) => (line.startsWith('Property')))
      .map((line) => line.replace('[object Object]', '[complex value]')).join('\n');
  };

  return iter(value);
};

export default plain;
