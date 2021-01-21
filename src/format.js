import stylish from './formatters/stylish.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`This ${formatName} is not supported`);
  }
};

export default format;
