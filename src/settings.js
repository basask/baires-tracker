const { homedir } = require('os');
const { readFileSync } = require('fs');

const content = readFileSync(`${homedir()}/.baires-tracker.json`);
const settings = JSON.parse(content);

function get(component) {
  return component === null ? settings : settings[component];
}

module.exports = { get };
