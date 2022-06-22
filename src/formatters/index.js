import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  if (formatName === 'stylish') {
    return stylish(data);
  }
  if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return JSON.stringify(data);
  }
  return new Error(`Unknown format: '${formatName}'!`);
};
