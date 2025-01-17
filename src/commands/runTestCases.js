// commands/runTestCases.js
const vscode = require('vscode');
const path = require('path');
const { getTestCaseFiles, readFromFile } = require('../utils/fileManager');
const { runCode } = require('../utils/codeRunner');

async function runTestCases() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const fileName = editor.document.fileName;
  const fileType = path.extname(fileName);

  const testCaseDir = path.join(__dirname, 'testCases');
  const { inputs, outputs } = getTestCaseFiles(testCaseDir);

  for (let index = 0; index < inputs.length; index++) {
    const input = readFromFile(path.join(testCaseDir, inputs[index]));
    const expectedOutput = readFromFile(path.join(testCaseDir, outputs[index])).trim();

    try {
      const actualOutput = await runCode(fileType, input);
      console.log(`Test Case ${index + 1}:`);
      console.log(`Expected: ${expectedOutput}`);
      console.log(`Actual: ${actualOutput}`);
      console.log(actualOutput === expectedOutput ? '✅ Passed' : '❌ Failed');
    } catch (error) {
      console.error(`Error running test case ${index + 1}: ${error}`);
    }
  }
}

module.exports = runTestCases;
