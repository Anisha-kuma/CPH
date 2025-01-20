const vscode = require('vscode');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { createDirectory, writeToFile } = require('../utils/fileManager');

async function fetchTestCases() {
  const url = await vscode.window.showInputBox({ prompt: "Enter the LeetCode problem URL" });
  if (!url) {
    vscode.window.showErrorMessage('No URL provided!');
    return;
  }

  try {
    vscode.window.showInformationMessage(`Fetching test cases from: ${url}`);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for the `<pre>` elements to load
    await page.waitForSelector('pre');

    // Extract test cases
    const testCases = await page.evaluate(() => {
      const testCaseElements = Array.from(document.querySelectorAll('pre'));
      const testCases = [];

      testCaseElements.forEach(preElement => {
        const strongElements = preElement.querySelectorAll('strong');
        let input = '';
        let output = '';

        strongElements.forEach(strong => {
          if (strong.innerText.includes('Input:')) {
            input = strong.nextSibling?.nodeValue?.trim() || '';
          } else if (strong.innerText.includes('Output:')) {
            output = strong.nextSibling?.nodeValue?.trim() || '';
          }
        });

        if (input && output) {
          testCases.push({ input, output });
        }
      });

      return testCases;
    });

    if (testCases.length === 0) {
      throw new Error('No test cases found on the provided URL!');
    }

    // Save test cases to files
    const testCaseDir = path.join(__dirname, 'testCases');
    createDirectory(testCaseDir);

    testCases.forEach((testCase, index) => {
      const inputFile = path.join(testCaseDir, `input_${index + 1}.txt`);
      const outputFile = path.join(testCaseDir, `output_${index + 1}.txt`);

      writeToFile(inputFile, testCase.input);
      writeToFile(outputFile, testCase.output);
    });

    vscode.window.showInformationMessage('Test cases fetched and saved successfully!');
    await browser.close();
  } catch (error) {
    console.error('Error while fetching test cases:', error);
    vscode.window.showErrorMessage(`Failed to fetch test cases: ${error.message}`);
  }
}

module.exports = fetchTestCases;


