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
    it('should return the first day of last month and yesterdays date last month', () => {
      getLastMonthFract(new Date()).should.eql([formatDate(first), formatDate(second)]);
    });
  });

  describe('getLastYearFract', () => {
    it('should return the first of the month and yesterdays date minus one year', () => {
      getLastYearFract(new Date()).should.eql([formatDate(first), formatDate(second)])
    })
  })
});



