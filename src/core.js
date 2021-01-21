import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parsers.js';
import format from './format.js';

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const unitedKeys = _.union(keys1, keys2).sort();

  return unitedKeys.map((key) => {
    const initValue = _.get(obj1, key);
    const newValue = _.get(obj2, key);

    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { key, type: 'added', newValue };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { key, type: 'removed', initValue };
    }
    if (_.isPlainObject(initValue) && _.isPlainObject(newValue)) {
      return {
        key, type: 'nested', children: genDiff(initValue, newValue),
      };
    }
    if (!_.isEqual(initValue, newValue)) {
      return {
        key,
        type: 'changed',
        initValue,
        newValue,
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return { key, type: 'unchanged', initValue };
    }
    throw new Error('Something went wrong');
  });
};

const compareFiles = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getFileData(filepath1);
  const file2 = getFileData(filepath2);

  const fileType1 = path.extname(filepath1);
  const fileType2 = path.extname(filepath2);

  const data1 = parseData(file1, fileType1);
  const data2 = parseData(file2, fileType2);

  const diff = genDiff(data1, data2);

  return format(diff, formatName);
};

export default compareFiles;
