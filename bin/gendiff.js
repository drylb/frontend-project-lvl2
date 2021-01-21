#!/usr/bin/env node

import commander from 'commander';
import compareFiles from '../src/core.js';

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output fromat', 'stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(compareFiles(filepath1, filepath2, format));
  })
  .parse(process.argv);
