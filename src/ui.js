function showTimeEntry(entry) {
    let { date, project, hours, comments, task, category, tags } = entry;
    hours = hours.toFixed(2);
    tags = tags ? `[${tags}]` : '|';
    console.log(`${date.toUi()} (${hours}h) ${project} ${tags} ${comments}`);
}

function showField(name, value) {
    console.log(`${name}: ${value}`);
}

module.exports = { showTimeEntry, showField };