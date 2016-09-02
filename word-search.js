#!/usr/bin/env node

'use strict'

const {createReadStream} = require("fs");
const {Transform} = require("stream");
const es = require("event-stream")
const limiter = require("./limit-ten.js");
// get the cmd line arg to search
const [,,searchTerm, ...rest] = process.argv;
const searchRegExp = new RegExp(`^${searchTerm}`, 'i');
//create the read stream
const readStream = createReadStream("/usr/share/dict/words");
readStream.pipe(es.split('\n'))
.pipe(es.map((datum, callback) => {
  if(datum.toString().search(searchRegExp) !== -1){
    callback (null, `${datum}\n`)
  } else {
   callback();
 }
})).pipe(limiter).pipe(process.stdout);
