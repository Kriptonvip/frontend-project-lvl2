import YAML from 'yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return YAML.parse(data);
    case 'yml':
      return YAML.parse(data);
    default:
      return Error('File path or extension is wrong');
  }
};

export default parse;
