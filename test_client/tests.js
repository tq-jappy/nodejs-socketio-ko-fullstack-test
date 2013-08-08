describe('1+1', function() {
  it('returns 2', function() {
    (1+1).should.equal(2);
  });
});

describe('formatDate', function() {
  it('returns yyyy/MM/dd HH:mm:ss format string', function() {
    var date = new Date(2010, 1, 2, 20, 30, 40);
    formatDate(date).should.equal('2010/02/02 20:30:40');
  });
});
