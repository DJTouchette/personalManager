var assert = require('chai').assert;
var Todo = require('../../../dist/models/Todos.js');

describe('String#split', function(){
  it('should return an array', function(){
    assert(Array.isArray('a,b,c'.split(',')));
  });
})