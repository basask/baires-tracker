const { InvalidArgumentError } = require('commander');
const { DateFormatter } = require('./formaters');

function dateParser(value) {
  const groups = value.match(/^(\d+)\/(\d+)\/(\d+)$/);
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
