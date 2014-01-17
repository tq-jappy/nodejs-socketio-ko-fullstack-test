should = require 'should'
calc = require '../../app/util/calc'

describe 'calc', ->
  describe 'add', ->
    it 'returns sum', ->
      calc.add(10, 20).should.equal(30)

  describe 'divide', ->
    it 'returns quotient', ->
      calc.divide(28, 4).should.equal(7)

    it 'returns infinity when dividing by zero', ->
      calc.divide(5, 0).should.equal(Infinity)