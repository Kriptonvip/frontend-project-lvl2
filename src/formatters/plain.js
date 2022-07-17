import _ from 'lodash';

const stringifyPlain = (value) => {
  if (value === null) return value;
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'number':
      return `${value}`;
    case 'boolean':
      return `${value}`;
    case 'object':
      return '[complex value]';
    default:
      throw new Error(`bad type of ${value}`);
  }
};

const plain = (tree) => {
  const iter = (node, objPath = '') => {
    if (!_.isObject(node)) {
      return `${node}`;
    }

    const lines = Object
      .entries(node)
      .map(([key, val]) => {
        if (val.children) {
          return iter(val.children, `${objPath}${key}.`);
        }
        switch (val.state) {
          case 'added':
            return `Property '${objPath}${key}' was added with value: ${stringifyPlain(val.value)}`;
          case 'old':
            return `Property '${objPath}${key}' was removed`;
          case 'changed':
            return `Property '${objPath}${key}' was updated. From ${stringifyPlain(val.oldValue)} to ${stringifyPlain(val.newValue)}`;
          default:
            return '';
        }
      });
    return lines.filter((line) => line !== '').join('\n');
  };
  return iter(tree);
};

export default plain;
