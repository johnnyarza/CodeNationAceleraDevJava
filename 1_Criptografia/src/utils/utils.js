const fs = require('fs');
const sha1 = require('js-sha1');

const utils = {
  readFile(path) {
    return fs.promises.readFile(path, 'utf-8');
  },
  writeFile(path, json) {
    return fs.promises.writeFile(path, JSON.stringify(json));
  },
  messageToSHA1Hash(str = '') {
    return sha1(str);
  },
  chars: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ],
};

module.exports = utils;
