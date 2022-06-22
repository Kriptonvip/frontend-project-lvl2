import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return JSON.stringify(data);
  }
  if (formatName === 'stylish') {
    return stylish(data);
  }
  return new Error(`Unknown format: '${formatName}'!`);
};
