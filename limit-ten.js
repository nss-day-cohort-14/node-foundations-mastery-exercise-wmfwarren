const {Transform} = require("stream");

const MAX_WORDS = 10; //max words to print
let counter = 0; //words printed so far


const transformStream = Transform({
  transform(buffer, _, callback) {
    if (counter < MAX_WORDS){
      counter++;
      callback(null, buffer)
    } else {
      callback();
    }
  }
});

module.exports = transformStream;
