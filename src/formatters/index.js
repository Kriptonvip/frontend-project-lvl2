import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown format: '${formatName}'!`);
  }
};
