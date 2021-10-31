function getCurrentMonthFract() {
  return([formatDate(getFirstDay(new Date())), formatDate(getDayBefore(new Date()))])
}

function getLastMonthFract() {
  return([formatDate(getFirstDayLastMonth(new Date)), formatDate(getDayBeforeLastMonth(new Date))])
}

function getLastYearFract() {
  return([formatDate(getFirstDayLastYear(new Date)), formatDate(getDayBeforeLastYear(new Date))])
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
  if( checkIfLastDay( date ) ) {
    if(checkIfMayOctDec(date) ) {
      date.setUTCDate( 29 );
      date.setUTCMonth(date.getUTCMonth() - 1);
      return date;
    }
    if ( checkIfAprJunSepNov( date ) || checkIfFeb( date ) ) {
      date.setUTCMonth(date.getUTCMonth() - 1);
      date.setUTCDate( 30 );
      return date;
    }
    if ( checkIfMarch(date) ) {
      var febDate = checkIfLeapYear( date ) ? 28 : 27;
      date.setUTCDate( febDate );
      date.setUTCMonth(date.getUTCMonth() - 1);
      return date;
    }
  }
  getDayBefore(date).setUTCMonth(date.getUTCMonth() - 1);
  return date;
}

function getFirstDayLastMonth(date) {
  date.setHours(12, 0, 0, 0);
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

function checkIfMayOctDec(date) {
  return ( date.getMonth() === 4 || date.getMonth() === 9 || date.getMonth() === 11 );
}

function checkIfAprJunSepNov(date) {
  return ( date.getMonth() === 3 || date.getMonth() === 5 || date.getMonth() === 8 || date.getMonth() === 10 );
}

function checkIfFeb( date ) {
  return ( date.getMonth() === 1 );
}

function checkIfMarch( date ) {
  return ( date.getMonth() === 2 );
}

function checkIfLeapYear( date ) {
  return ( date.getFullYear() % 4 === 0 );
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
  getDayBefore,
  getFirstDay,
  getCurrentMonthFract,
  getDayBeforeLastMonth,
  checkIfLastDay,
  checkIfMayOctDec,
  checkIfAprJunSepNov,
  checkIfFeb,
  checkIfMarch,
  checkIfLeapYear,
  getFirstDayLastMonth,
  getLastMonthFract,
  getDayBeforeLastYear,
  getFirstDayLastYear,
  getLastYearFract
}