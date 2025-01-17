const fs = require('fs');
const path = require('path');

// Create a directory if it doesn't exist
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

// Write content to a file
function writeToFile(filePath, content) {
  fs.writeFileSync(filePath, content.trim());
}

// Read content from a file
function readFromFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// Get input and output files from the test case directory
function getTestCaseFiles(testCaseDir) {
  const inputs = fs.readdirSync(testCaseDir).filter(file => file.startsWith('input_'));
  const outputs = fs.readdirSync(testCaseDir).filter(file => file.startsWith('output_'));
  return { inputs, outputs };
}

module.exports = {
  createDirectory,
  writeToFile,
  readFromFile,
  getTestCaseFiles
};
