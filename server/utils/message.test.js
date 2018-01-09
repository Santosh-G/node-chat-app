var expect = require('expect');

var {genereateMessage} = require('./message');
describe('genereateMessage',()={
  it('should generate correct message object',()={
      var from ='Santosh';
      var text ="Some message";
      var message = genereateMessage(from,text);
      expect(message.createAt).toBeA('number');
      expect(message).toInclude({from,text});

  });
});
