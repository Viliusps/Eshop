const lowercaseFunctions = require('./rules/lowercaseFunctions');
const noNumbersInVariables = require('./rules/noNumbersInVariables');

// eslint-disable-next-line no-undef
module.exports = {
  rules: {
    lowercaseFunctions,
    noNumbersInVariables
  }
};
