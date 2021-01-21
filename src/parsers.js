import YAML from 'yaml';

const parseData = (data, fileType) => {
  if (fileType === '.json') {
    return JSON.parse(data);
  }
  if (fileType === '.yml' || fileType === '.yaml') {
    return YAML.parse(data);
  }
  throw new Error(`This ${fileType} is not supported`);
};

export default parseData;
