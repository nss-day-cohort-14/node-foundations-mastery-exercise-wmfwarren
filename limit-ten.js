const {Transform} = require("stream");

const MAX_WORDS = 10;
let counter = 0;
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
