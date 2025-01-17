// utils/codeRunner.js
const { exec, execSync } = require('child_process');

// Compile and execute code based on the file type
function runCode(fileType, input) {
  const commands = {
    '.cpp': ['g++ -std=c++17 -o main main.cpp', './main'],
    '.py': ['python main.py']
  };

  const [compileCmd, runCmd] = commands[fileType] || [];
  if (!runCmd) {
    throw new Error('Unsupported file type!');
  }

  if (compileCmd) {
    execSync(compileCmd, { stdio: 'inherit' });
  }

  return new Promise((resolve, reject) => {
    exec(runCmd, { input }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

module.exports = {
  runCode
};
