
# Typing Speed Checker

This project is a Typing Speed Checker application built with React and Tailwind CSS. It allows users to test their typing speed and accuracy, and provides grammar and spelling feedback.

## Features

- Typing speed test with selectable reference texts
- Customizable test duration
- Real-time WPM (Words Per Minute) and accuracy calculation
- Grammar and spelling check using an external API
- Results history

## Project Structure
frontend/ ├── .gitignore ├── package.json ├── public/ │ ├── index.html │ ├── manifest.json │ └── robots.txt ├── README.md ├── src/ │ ├── App.css │ ├── App.js │ ├── App.test.js │ ├── components/ │ │ ├── Header.jsx │ │ ├── ProgressBar.jsx │ │ ├── Results.jsx │ │ └── TypingTest.jsx │ ├── hooks/ │ │ ├── useInterval.js │ │ └── useTypingTest.js │ ├── index.css │ ├── index.js │ ├── reportWebVitals.js │ ├── setupTests.js │ └── styles/ │ └── global.css └── tailwind.config.js


## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ganeshraja05/typing-speed-checker.git
   cd typing-speed-checker/frontend
Install the dependencies:
  npm install
Running the Application
To start the application in development mode, run:
npm start
Open http://localhost:3000 to view it in your browser.

Running Tests
npm test
To run the tests, use:
npm run build
Building for Production
The build artifacts will be stored in the build/ directory.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

License
This project is licensed under the MIT License - see the LICENSE file for details.

