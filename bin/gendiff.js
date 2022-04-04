#!/usr/bin/env node
import { Command } from 'commander';
// eslint-disable-next-line import/extensions
import compare from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version ', 'output the version number')
  .helpOption('-h, --HELP', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    if (program.opts().format === 'plain') {
      compare(filepath1, filepath2, 'plain');
    }
    if (program.opts().format === 'json') {
      compare(filepath1, filepath2, 'json');
    }
  });

program.parse();

export default compare;
