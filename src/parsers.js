const { InvalidArgumentError } = require('commander');
const { DateFormatter } = require('./formaters');

function dateParser(value) {
    const groups = value.match(/^(\d+)\/(\d+)\/(\d+)$/);
    if (groups === null) {
        throw new InvalidArgumentError('Wrong date format. Use dd/mm/yyyy for dates');
    }
    let [day, month, year] = groups.slice(1,4);
    year = parseInt(year.length === 2 ? `20${year}`: year);
    return new DateFormatter(year, parseInt(month) - 1, day);
}

module.exports = {
    dateParser
}