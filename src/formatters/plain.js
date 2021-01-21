const isValueString = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const format = (diff, previousKey = '') => {
  const result = diff.map((item) => {
    const {
      key, type, initValue, newValue, children,
    } = item;
    const prevKey = previousKey !== '' ? (`${previousKey}.${key}`) : `${key}`;

    switch (type) {
      case 'added':
        return `Property '${prevKey}' was added with value: ${isValueString(newValue)}`;
      case 'removed':
        return `Property '${prevKey}' was removed`;
      case 'changed':
        return `Property '${prevKey}' was updated. From ${isValueString(initValue)} to ${isValueString(newValue)}`;
      case 'nested':
        return `${format(children, prevKey)}`;
      case 'unchanged':
        return '';
      default: throw new Error(`There is no such ${type}`);
    }
  });
  return result.map((item) => {
    if (item.includes('[object Object]')) {
      return item.replace('[object Object]', '[complex value]');
    }
    return item;
  }).filter((item) => item !== '')
    .join('\n');
};

export default format;
