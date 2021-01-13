#!/usr/bin/env node

import commander from 'commander';

const { program } = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format[type]', 'output fromat');
program.parse(process.argv);
