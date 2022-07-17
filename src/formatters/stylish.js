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
        const { state, value } = val;
        if (val.children) {
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
            return `${indentforDiff}- ${key}: ${stringify(val.oldValue, replacer, indentSize)}\n${indentforDiff}+ ${key}: ${stringify(val.newValue, replacer, indentSize)}`;
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
