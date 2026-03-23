- [Demo](#demo)
- [Setup](#setup)
- [MCP Servers](#mcp-servers)

# Demo

Repository example for automation tests exercises https://automationexercise.com/test_cases

# Setup

1. Install [nodejs & npm](https://nodejs.org/en/)
2. Clone this repo
3. Run these commands in the project root folder:
   1. `npm i`
   2. `npm i -g ts-node`
   3. `npx playwright install --with-deps`
      \*if you encounter an `EACCESS` error - try the same command with `sudo` at the beginning
4. Run `npm run template` - if test passes then you did everything right :)
5. HTML report is published at:
   - for Prod env:
   - for Stage env:
6. See available commands in `package.json`

# MCP Servers

This project is configured with Model Context Protocol (MCP) servers to enhance GitHub Copilot capabilities:

## Configured MCP Servers

### 1. Filesystem MCP

- **Purpose**: Manage test data files, test specs, and service files directly through Copilot
- **Access**: Read/write files in `data/`, `tests/`, and `Services/` directories
- **Use cases**:
  - Generate test data files
  - Create new test specifications
  - Update service/page object files

### 2. Fetch MCP

- **Purpose**: Fetch and analyze web content for API testing
- **Use cases**:
  - Test API endpoints
  - Scrape web content for test validation
  - Debug HTTP requests/responses

### 3. Playwright MCP

- **Purpose**: Playwright-specific automation tools and helpers
- **Use cases**:
  - Generate Playwright selectors
  - Get Playwright API documentation
  - Assist with test script creation

## Using MCP Servers

The MCP servers are configured in `.vscode/settings.json` and will automatically be available when using GitHub Copilot Chat in VS Code. You can ask Copilot to perform tasks that leverage these servers, such as:

- "Read the test data from data.ts and create a new test case"
- "Fetch the API response from the products endpoint and validate it"
- "Generate a Playwright test for user registration workflow"
