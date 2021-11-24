function showTimeEntry(entry) {
  const {
    date,
    // project,
    hours,
    comments,
    task,
    category,
    // tags,
  } = entry;
  const fmtHours = hours.toFixed(2);
  // const fmtTags = tags ? `[${tags}]` : '|';
  // eslint-disable-next-line no-console
  console.log(`${date.toUi()} (${fmtHours}h) ${category}:${task} - ${comments}`);
}

function showField(name, value) {
  // eslint-disable-next-line no-console
  console.log(`${name}: ${value}`);
}

function showError(message) {
  // eslint-disable-next-line no-console
  console.error(`ERR: ${message}`);
}

module.exports = {
  showTimeEntry,
  showField,
  showError,
};
