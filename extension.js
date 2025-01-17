const vscode = require('vscode');
const fetchTestCases = require('./src/commands/fetchTestCases');
const runTestCases = require('./src/commands/runTestCases');
function activate(context) {
  console.log('CPH extension activated!');
  context.subscriptions.push(
    vscode.commands.registerCommand('cph.fetchTestCases', fetchTestCases),
    vscode.commands.registerCommand('cph.runTestCases', runTestCases)
  );
}



function deactivate() {}

module.exports = {
  activate,
  deactivate
};

