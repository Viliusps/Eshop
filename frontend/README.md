# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Formatting

### Visual Studio Code:

Go to Extensions and install Prettier. After installing, it is recommended to restart the IDE.
To automatically format document open settings menu by tapping “Command + ,(comma)” if you use a Mac.
Click on “Control + ,(comma)”, if you are a Windows user. Go to the search bar and input “Editor: Format on Save.”
and ensure it has a checkmark.

For those trying to quickly change Prettier settings for VS Code. Here are the steps:

Go to FILE -> PREFERENCES -> SETTINGS. (VS Code Menus)
Settings window should open. Above (Top) there is a search. Type "Prettier"
You should see the available Prettier settings. You can modify them :)

### Intellij:

In the Settings dialog (Ctrl+Alt+S), go to Languages & Frameworks | JavaScript | Prettier,
and turn on the 'On save' checkbox to automatically format the code after save.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test -- --coverage .`

Generates coverage report.

### `npm run test -- --coverage . --collectCoverageFrom="src/components/pages/**/*.{js,jsx}"`

Coverage report for the `pages` folder

### SonarQube

1. Use `docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest`
2. Open `localhost:9000` and login with admin:admin
3. Run `npm install -g sonarqube-scanner`
4. Execute analysis `sonar-scanner -D sonar.login=admin -D sonar.password=<PASSWORD>`