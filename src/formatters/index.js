import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatName) => {
  switch (formatName) {
    case 'plain':
      console.log(plain(data));
      return plain(data);
    case 'json':
      console.log(JSON.stringify(data));
      return JSON.stringify(data);
    default:
      console.log(stylish(data));
      return stylish(data);
  }
};
