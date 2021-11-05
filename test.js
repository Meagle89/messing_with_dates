const {  
  formatDate,
  getCurrentMonthFract, 
  getLastMonthFract,
  getLastYearFract
} = require('./dates');

var should = require('chai').should();

describe('My date functions', () => {

  describe('getCurrentMonthFract', () => {
    it('should return an array', () => {
      var date = new Date(2021, 9, 1);
      Array.isArray(getCurrentMonthFract(date)).should.equal(true);
    });

    it('should return the first of the input month', () => {
      var date = new Date(2021, 9, 15);
      getCurrentMonthFract(date)[0].should.equal(formatDate(new Date(2021, 9, 1)));
    });

    it('should return the the input date minus one day', () => {
      var date = new Date(2021, 9, 21);
      getCurrentMonthFract(date)[1].should.equal(formatDate(new Date(2021, 9, 20)));
    });

    it('if input date is the first of the month then should return whole of previous month', () => {
      var date = new Date(2021, 9, 1);
      getCurrentMonthFract(date).should.eql([formatDate(new Date(2021, 8, 1)), formatDate(new Date(2021, 9, 0))]);
    });

    it('if input date is the end of the month it should return the penultimate day of the month', () => {
      var date = new Date(2021, 9, 31);
      getCurrentMonthFract(date)[1].should.equal(formatDate(new Date(2021, 9, 30)));
    });
  });

  describe('getLastMonthFract', () => {
    it('should return an array', () => {
      var date = new Date(2021, 9, 1);
      Array.isArray(getLastMonthFract(date)).should.equal(true);
    });

    it('should return the first day of last month', () => {
      var date = new Date(2021, 9, 10);
      getLastMonthFract(date)[0].should.equal(formatDate(new Date(2021, 8, 1)));
    });

    it('should return the input date minus one day minus one month', () => {
      var date = new Date(2021, 9, 15);
      getLastMonthFract(date)[1].should.equal(formatDate(new Date(2021, 8, 14)));
    });

    it('if input date is greater than 28th March it should return the whole of February', () => {
      var date = new Date(2021, 2, 29);
      getLastMonthFract(date).should.eql([formatDate(new Date(2021, 1, 1)), formatDate(new Date(2021, 2, 0))]);
    });

    it('input date is the last day of the month it should return complete last month', () => {
      var date = new Date(2021, 9, 31);
      getLastMonthFract(date).should.eql([formatDate(new Date(2021, 8, 1)), formatDate(new Date(2021, 9, 0))]);
    });
  });

  describe('getLastYearFract', () => {
    it('should return an array', () => {
      var date = new Date(2021, 9, 1);
      Array.isArray(getLastYearFract(date)).should.equal(true);
    });

    it('should return the first of the input month minus one year', () => {
      var date = new Date(2021, 9, 15);
      getLastYearFract(date)[0].should.equal(formatDate(new Date(2020, 9, 1)));
    });

    it('should return input date minus one day minus one year', () => {
      var date = new Date(2021, 9, 15);
      getLastYearFract(date)[1].should.equal(formatDate(new Date(2020, 9, 14)));
    });
  })
});



