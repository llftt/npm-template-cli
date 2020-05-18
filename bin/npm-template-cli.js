#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('rollup', 'generate a project packed with rollup')
  .command('webpack', 'generate a project packed with webpack')
  .parse(process.argv)