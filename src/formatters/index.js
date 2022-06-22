import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  if (formatName === 'plain') {
    return plain(data);
  }
  if (formatName === 'json') {
    return JSON.stringify(data);
  }
  return stylish(data);
};
