const { 
  formatDate, 
  getDayBefore, 
  getFirstDay, 
  getCurrentMonthFract, 
  checkIfLastDay, 
  checkIfMayOctDec,
  checkIfAprJunSepNov, 
  getDayBeforeLastMonth,
  checkIfFeb,
  checkIfMarch,
  checkIfLeapYear,
  getFirstDayLastMonth,
  getLastMonthFract,
  getDayBeforeLastYear,
  getFirstDayLastYear,
  getLastYearFract
} = require('./dates');

var should = require('chai').should();

describe('My date functions', () => {
  describe('formatDate', () => {
    it('should format a date object in DDMMYY format', () => {
      var date = new Date(2014, 9, 14);
      formatDate(date).should.equal('141014');
    });

    it('should add 0 to single digit numbers in date', () => {
      var date = new Date(2014, 0, 5);
      formatDate(date).should.equal('050114');
    })
  });

  describe('getDayBefore', ()=> {
    it('should return the previous days date', () => {
      var date = new Date(1989, 2, 15);
      formatDate(getDayBefore(date)).should.equal('140389');
    });

    it('should return the last day of the previous month', () => {
      var date = new Date(1989, 4, 1);
      formatDate(getDayBefore(date)).should.equal('300489');
    });

    it('should return the 31st December of the previous year if passed jan 1st', () => {
      var date = new Date(2021, 0, 1);
      formatDate(getDayBefore(date)).should.equal('311220');
    })
  });

  describe('getFirstDay', () => {
    it('should return the first day of the month', () => {
      var date = new Date(2021, 9, 15);
      formatDate(getFirstDay(date)).should.equal('011021');
    });

    it('should return the 1st of last month if passed the first of the current month', () => {
      var date = new Date(2021, 9, 1);
      formatDate(getFirstDay(date)).should.equal('010921');
    })
  });

  describe('getCurrentMonthFract', () => {
    it('should return an array', () => {
      var date = new Date(2021, 9, 1);
      Array.isArray(getCurrentMonthFract(date)).should.equal(true);
    });

    it('should return the first of the current month and the day before input date', () => {
      var first = getFirstDay(new Date());
      var second = getDayBefore(new Date());
      getCurrentMonthFract().should.eql([formatDate(first), formatDate(second)]);
    });

    // it('if the input date is the 1st of the month it should return whole of last month', () => {
    //   var date = new Date(2021, 9, 1);
    //   getCurrentMonthFract(date).should.eql(['010921', '300921']);
    // })
  });

  describe("checkIfLastDay", () => {
    it('should return true if the date is the last day of the month', () => {
      var date = new Date(2021, 9, 31);
      checkIfLastDay(date).should.equal(true);
    });

    it('should return false if the date is not the last day of the month', () => {
      var date = new Date(2021, 9, 30);
      checkIfLastDay(date).should.equal(false);
    });
  });

  describe("checkIfMayOctDec", () => {
    it('should return true if month is May, October or December', () => {
      var date = new Date(2021, 4, 30);
      checkIfMayOctDec(date).should.equal(true);
    });

    it('should return false if month is not May, October or December', () => {
      var date = new Date(2021, 3, 10);
      checkIfMayOctDec(date).should.equal(false);
    })
  });

  describe("checkIfAprJunSepNov", () => {
    it('should return true if month is april, june, september or november', () => {
      var date = new Date(2021, 3, 30);
      checkIfAprJunSepNov(date).should.equal(true);
    });

    it('should return false if month is not april, june, september or november', () => {
      var date = new Date(2021, 4, 10);
      checkIfAprJunSepNov(date).should.equal(false);
    })
  });

  describe('checkIfFeb', () => {
    it('should return true if month is february', () => {
      var date = new Date(2021, 1, 25);
      checkIfFeb(date).should.equal(true);
    });

    it('should return false if month is not february', () => {
      var date = new Date(2021, 0, 25);
      checkIfFeb(date).should.equal(false);
    });
  });

  describe('checkIfMarch', () => {
    it('should return true if month is march', () => {
      var date = new Date(2021, 2, 25);
      checkIfMarch(date).should.equal(true);
    });

    it('should return false if month is not march', () => {
      var date = new Date(2021, 11, 25);
      checkIfMarch(date).should.equal(false);
    });
  });

  describe("checkIfLeapYear", () => {
    it('should return true if year is divisible by 4', () => {
      var date = new Date(2016, 2, 25);
      checkIfLeapYear(date).should.equal(true);
    });

    it('should return false if year is not divisible by 4', () => {
      var date = new Date(2021, 11, 25);
      checkIfLeapYear(date).should.equal(false);
    });
  })

  describe('getDayBeforeLastMonth', () => {
    it('should return day befores date minus one month', () => {
      var date = new Date(2021, 9, 15);
      formatDate(getDayBeforeLastMonth(date)).should.equal('140921');
    });

    it('if month is May, Oct or December and the date is 31st it should return the 29th of the previous month', () => {
      var date = new Date(2021, 11, 31);
      formatDate(getDayBeforeLastMonth(date)).should.equal('291121');
    });

    it('if the current month ends on the 30th and the previous month ends on the 31st, it should return the 30th of previous month', () => {
      var date = new Date(2021, 10, 30);
      formatDate(getDayBeforeLastMonth(date)).should.equal('301021');
    });

    it('if the current month is february and it is the last day of the month it should return 30th of January', () => {
      var date = new Date(2021, 1, 28);
      formatDate(getDayBeforeLastMonth(date)).should.equal('300121');
    });

    it('if the current month is March and it is the end of the month then it should return 27th February, unless the year is divisible by 4 when it should return 28th Feb', () => {
      var date = new Date(2021, 2, 31);
      formatDate(getDayBeforeLastMonth(date)).should.equal('270221');
    })
  });

  describe('getFirstDayLastMonth', () => {
    it('should return the first day of last month', () => {
      var date = new Date(2021, 1, 27);
      formatDate(getFirstDayLastMonth(date)).should.equal('010121');
    });
  });

  describe('getLastMonthFract', () => {
    it('should return the first day of last month and yesterdays date last month', () => {
      var first = getFirstDayLastMonth(new Date());
      var second = getDayBeforeLastMonth(new Date());
      getLastMonthFract().should.eql([formatDate(first), formatDate(second)]);
    });
  });

  describe('getDayBeforeLastYear', () => {
    it('should return yesterdays date minus one year', () => {
      var date = new Date(2021, 1, 27);
      formatDate(getDayBeforeLastYear(date)).should.equal('260220');
    });
  });

  describe('getFirstDayLastYear', () => {
    it('should return the first of the month minus one year', () => {
      var date = new Date(2021, 1, 27);
      formatDate(getFirstDayLastYear(date)).should.equal('010220');
    })
  });

  describe('getLastYearFract', () => {
    it('should return the first of the month and yesterdays date minus one year', () => {
      var first = getFirstDayLastYear(new Date());
      var second = getDayBeforeLastYear(new Date());
      getLastYearFract().should.eql([formatDate(first), formatDate(second)])
    })
  })
});



