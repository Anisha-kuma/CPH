This project is a dynamic problem-solving platform that automates the process of fetching problems from LeetCode, parsing test cases, and validating user-submitted solutions by comparing their output with expected results. It supports multiple programming languages and provides an end-to-end workflow for competitive programming practice.

Features
Fetch Problem Details: Automatically fetch problem descriptions, test cases, and other metadata from LeetCode using their GraphQL API.
Parse and Save Test Cases: Extract example test cases from the fetched problem details and store them in structured formats like JSON and text files.
Run User Code: Execute user-written solutions in multiple programming languages (C++, Python, etc.) against the test cases.
Validate Outputs: Compare actual outputs generated by the user's code with the expected outputs and provide clear pass/fail feedback.
Language Support: Currently supports C++ and Python, with the potential to add more languages.
Project Workflow
Fetch Problem Details:

Uses LeetCode's GraphQL API to retrieve the problem's metadata (title, content, difficulty, test cases, etc.).
Parse and Save Test Cases:

Parses fetched test cases into structured objects and saves them in JSON and text file formats for future use.
Code Execution:

Allows users to write their solutions in their preferred language and runs the code against the saved test cases.
Output Validation:

Compares the outputs from the user's code with the expected outputs and reports results for each test case.
