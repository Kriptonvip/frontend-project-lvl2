import _ from 'lodash';
import stringify from './stringify.js';

const stylish = (tree) => {
  const iter = (node, depth, spacesCount = 4) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const indentforDiff = replacer.repeat(indentSize - 2);
    const indentClose = replacer.repeat(indentSize - 4);
    const lines = Object
      .entries(node)
      .map(([key, val]) => {
        const { type, state, value } = val;
        if (type === 'node') {
          return `${currentIndent}${key}: ${iter(val.children, depth + 1)}`;
        }
        const stringValue = stringify(value, replacer, indentSize);
        switch (state) {
          case 'added':
            return `${indentforDiff}+ ${key}: ${stringValue}`;
          case 'old':
            return `${indentforDiff}- ${key}: ${stringValue}`;
          case 'unchanged':
            return `${indentforDiff}  ${key}: ${stringValue}`;
          case 'changed':
            return `${indentforDiff}- ${key}: ${stringify(value[0], replacer, indentSize)}\n${indentforDiff}+ ${key}: ${stringify(value[1], replacer, indentSize)}`;
          default:
            throw new Error(`Unknown state: '${state}'!`);
        }
      });
    return [
      '{',
      ...lines,
      `${indentClose}}`,
    ].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
