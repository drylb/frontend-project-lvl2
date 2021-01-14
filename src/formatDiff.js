import _ from 'lodash';

const operations = {
  added: '+',
  removed: '-',
  unchaged: ' ',
};

// const indentSpace = ' ';

// const getIndentSpace = (depth) => indentSpace.repeat(depth);

const formatMessage = (operation, key, value, depth = '  ') => {
  const message = `${depth}${operation} ${key}: ${value}`;
  return message;
};

const formatDiffs = (diffs) => {
  const diff = diffs.map((item) => {
    const {
      key, type, initValue, newValue,
    } = item;

    if (type === 'added') {
      return [formatMessage(operations.added, key, newValue)];
    }

    if (type === 'removed') {
      return [formatMessage(operations.removed, key, initValue)];
    }

    if (type === 'changed') {
      return [
        [formatMessage(operations.removed, key, initValue)],
        [formatMessage(operations.added, key, newValue)],
      ];
    }

    if (type === 'unchanged') {
      return [formatMessage(operations.unchaged, key, initValue)];
    }

    throw new Error(`Unknown type: ${type}`);
  });

  const flattedArr = _.flattenDeep(diff);
  return `{\n${flattedArr.join('\n')}\n}`;
};

export default formatDiffs;
