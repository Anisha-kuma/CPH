const vscode = require('vscode');
const fetch = require('node-fetch');
const path = require('path');
const { createDirectory, writeToFile } = require('../utils/fileManager');

async function fetchTestCases() {
  const url = await vscode.window.showInputBox({ prompt: "Enter the LeetCode problem URL" });
  if (!url) {
    vscode.window.showErrorMessage('No URL provided!');
    return;
  }

  try {
    vscode.window.showInformationMessage(`Fetching test cases from: ${url}`);
    const response = await fetch(url, { timeout: 10000 }); // 10-second timeout
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Extract test cases using regex
    const testCaseRegex = /<pre>(.*?)<\/pre>/gs;
    const matches = [...html.matchAll(testCaseRegex)];
    const testCases = matches.map(match => match[1]);

    // Save test cases
    const testCaseDir = path.join(__dirname, 'testCases');
    createDirectory(testCaseDir);

    testCases.forEach((testCase, index) => {
      const inputFile = path.join(testCaseDir, `input_${index + 1}.txt`);
      const outputFile = path.join(testCaseDir, `output_${index + 1}.txt`);

      const [input, output] = testCase.split('\n\n');
      writeToFile(inputFile, input);
      writeToFile(outputFile, output);
    });

    vscode.window.showInformationMessage('Test cases fetched and saved successfully!');
  } catch (error) {
    console.error('Error while fetching test cases:', error);
    vscode.window.showErrorMessage(`Failed to fetch test cases: ${error.message}`);
  }
}

//module.exports = fetchTestCases;
module.exports = function fetchTestCases() {
  // Your implementation here
  console.log('Fetching test cases...');
};


