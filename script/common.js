const clone = require('git-clone');
const program = require('commander');
const ora = require('ora');
const exists = require('fs').existsSync;
const path = require('path');
const rm = require('rimraf').sync;
const inquirer = require('inquirer');
const repo = require('../config/repo');

module.exports = function(repoName){

    /**
     * Usage
     */
    program.version(require('../package').version)
           .usage('[project-name]')
           .parse(process.argv);

           const folderName = program.args[0];
           const inPlace = !folderName || folderName === '.';
           const dist = path.resolve(folderName || '.');
           const template = repo[repoName];
       
           if (exists(dist)) {
               inquirer.prompt([{
                   type: 'confirm',
                   message: inPlace ?
                       'Generate project in current directory?' : 'Target directory exists. Continue?',
                   name: 'ok'
               }]).then(function (answers) {
                   if (answers.ok) {
                       run()
                   }
               });
           } else {
               run()
           }
       
           /**
            * Check, download and generate the project.
            */
       
           function run() {
               const spinner = ora('downloading template');
               spinner.start();
               if (inPlace) {
                   //  在当前目录
               } else {
                   if (exists(dist)) {
                       rm(dist);
                   }
               }
       
               clone(template, dist, function (err) {
                   spinner.stop();
                   if (err) {
                       console.log('Failed to download repo ' + template + ': ' + err.message.trim());
                   } else {
                       rm(path.resolve(dist, '.git'));
                       console.log('Generated "%s".', dist);
                   }
               });
           }
}