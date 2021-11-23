const { InvalidArgumentError } = require('commander');
const { DateFormatter } = require('./formaters');

function dateParser(value) {
  const groups = value.match(/^(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/(\d{2}|\d{4})$/);
  if (groups === null) {
    throw new InvalidArgumentError('Wrong date format. Use dd/mm/yyyy for dates');
  }
  const [day, month, year] = groups.slice(1, 4);
  const fmtYear = parseInt(year.length === 2 ? `20${year}` : year, 10);
  return new DateFormatter(fmtYear, parseInt(month, 10) - 1, day);
}

module.exports = {
  dateParser,
};
