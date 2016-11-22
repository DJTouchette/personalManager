import { assert } from 'chai';
import { TodoController } from '../../controllers/index.js';

describe('String#split', function(){
  it('should return an array', function(){
  	console.log(TodoController);
    assert(Array.isArray('a,b,c'.split(',')));
  });
})