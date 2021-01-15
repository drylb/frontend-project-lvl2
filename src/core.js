import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import formatDiffs from './formatDiff.js';
import parseData from './parsers.js';

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const allKeys = _.union(keys1, keys2).sort();

  return allKeys.map((key) => {
    const initValue = _.get(file1, key);
    const newValue = _.get(file2, key);

    if (_.has(file1, key) && !_.has(file2, key)) {
      return { key, type: 'removed', initValue };
    }

    if (!_.has(file1, key) && _.has(file2, key)) {
      return { key, type: 'added', newValue };
    }

    if (!_.isEqual(initValue, newValue)) {
      return {
        key,
        type: 'changed',
        initValue,
        newValue,
      };
    }

    return { key, type: 'unchanged', initValue };
  });
};

const compareFiles = (filepath1, filepath2) => {
  const file1 = getFileData(filepath1);
  const file2 = getFileData(filepath2);

  const fileType1 = path.extname(filepath1);
  const fileType2 = path.extname(filepath2);

  const data1 = parseData(file1, fileType1);
  const data2 = parseData(file2, fileType2);

  const diff = genDiff(data1, data2);

  return formatDiffs(diff);
};

// console.log(path.extname('file1.json'));

export default compareFiles;
