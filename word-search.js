#!/usr/bin/env node

'use strict'

//eternal packages
const {createReadStream} = require("fs");
const {Transform} = require("stream");
const es = require("event-stream")
const limiter = require("./limit-ten.js");

// get the cmd line arg to search
const [,,searchTerm, ...rest] = process.argv;
const searchRegExp = new RegExp(`^${searchTerm}`, 'i');

//create the read stream
const readStream = createReadStream("/usr/share/dict/words");

if(process.argv.length === 2){
  console.log("To search please enter: ./word-search.js [seachTerm]");
  process.exit();
}

readStream.pipe(es.split('\n'))
.pipe(es.map((datum, callback) => {
  if(datum.toString().search(searchRegExp) === 0){
    callback (null, `${datum}\n`)
  } else {
   callback();
 }
})).pipe(limiter).pipe(process.stdout);
