import _ from 'lodash';

const stylish = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) { // альтернативный вариант: typeof currentValue !== 'object'
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const diffIndent = replacer.repeat(indentSize - 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const isDiff = ['+', '-'].some((s) => key.startsWith(s));
        const indent = isDiff ? diffIndent : currentIndent;
        return `${indent}${key}: ${iter(val, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
