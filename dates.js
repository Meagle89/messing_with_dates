function getCurrentMonthFract(date) {
  var dateClone1 = new Date(date.getTime());
  var dateClone2 = new Date(date.getTime());
  return([formatDate(getFirstDay(dateClone1)), formatDate(getDayBefore(dateClone2))])
}

function getLastMonthFract(date) {
  var dateClone1 = new Date(date.getTime());
  var dateClone2 = new Date(date.getTime());
  return([formatDate(getFirstDayLastMonth(dateClone1)), formatDate(getDayBeforeLastMonth(dateClone2))])
}

function getLastYearFract(date) {
  var dateClone1 = new Date(date.getTime());
  var dateClone2 = new Date(date.getTime());
  return([formatDate(getFirstDayLastYear(dateClone1)), formatDate(getDayBeforeLastYear(dateClone2))])
}

function getDayBefore(date) {
  date.setHours(12, 0, 0, 0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - 1);
  return date;
}

function getFirstDay(date) {
  date.setHours(12, 0, 0, 0);
  date.setUTCHours(12, 0, 0, 0);
  if( date.getUTCDate() === 1 ) return getFirstDayLastMonth(date);
  date.setUTCDate( 1 );
  return date;
}

function getDayBeforeLastMonth(date) {
  date.setHours(12, 0, 0, 0);
  date.setUTCHours(12, 0, 0, 0);
  if( date.getUTCMonth() == 2 && date.getUTCDate() > 28 ) {
    date.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), 0);
    return date;
  }
  if( checkIfLastDay( date ) ) {
    date.setUTCDate(0);
    return date;
  }
  getDayBefore(date).setUTCMonth(date.getUTCMonth() - 1);
  return date;
}

function getFirstDayLastMonth(date) {
  //date.setHours(12, 0, 0, 0);
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCMonth(date.getUTCMonth() - 1 );
  date.setUTCDate( 1 );
  return date;
}

function checkIfLastDay(date) {
  var test = new Date(date.getTime());
  test.setDate(test.getDate() + 1);
  return test.getDate() === 1;
}

function getDayBeforeLastYear( date ) {
  getDayBefore(date).setUTCFullYear(date.getUTCFullYear() - 1 );
  return date;
}

function getFirstDayLastYear( date ) {
  getFirstDay(date).setUTCFullYear(date.getUTCFullYear() - 1 );
  return date;
}

function formatDate(date) { 
  var day = `${date.getDate()}`;
  var month = `${date.getMonth() + 1 }`;
  var year = `${date.getFullYear()}`

  if(day.length < 2 ) day = '0' + day;
  if(month.length < 2 ) month = '0' + month;

  return (`${day}${month}${year.substring(2,4)}`);
}

module.exports = {
  formatDate,
  getCurrentMonthFract,
  getLastMonthFract,
  getLastYearFract
}