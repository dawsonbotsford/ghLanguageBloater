#!/usr/bin/env node
'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const helper = require('./helper.js');

inquirer.prompt([
  {
    type: 'list',
    name: 'language',
    message: 'What language would you like to generate?',
    default: 'CSS',
    choices: helper.buildChoices()
  },
  {
    type: 'input',
    name: 'size',
    message: 'What size file? (bytes)',
    default: '10000',
    filter: function( val ) {
      if (!helper.isSafeInteger(val)) {
        throw new Error('File size must be a positive integer <= 100,000,000');
      }
      return val.toLowerCase();
    }
  }
], function( answers ) {
  //generate the test file here
  // console.log( JSON.stringify(answers, null, '  ') );
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'generateFile',
      message: 'Generate a ' + answers.size + ' byte ' + answers.language + ' file?',
      default: 'true'
    }
  ], function( confirm ) {
    if (confirm.generateFile === true) {
      const suffix = helper.getSuffix(answers.language);
      const fileName = 'puffer-fish.' + suffix;
      console.log('Building ' + fileName + '...');
      const finalString = new Array( Number(answers.size) + 1).join('p');
      fs.writeFileSync(fileName, finalString, 'utf8');
      console.log(chalk.green(fileName + ' successfully written!'));
    }
    else {
      console.log(chalk.yellow('No file and 0 bytes puffer-fished'));
    }
  });
});