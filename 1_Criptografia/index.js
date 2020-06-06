const fetch = require('node-fetch');
const utils = require('./src/utils/utils');
const express = require('express');

const filePath = './src/answer.json';
const chars = utils.chars;
let answer = {};

async function init() {
  try {
    await fetchData();
    const data = JSON.parse(await getFile());
    data.decifrado = cesarDecrypt(data);
    data.resumo_criptografico = utils.messageToSHA1Hash(data.decifrado);
    utils.writeFile(filePath, data);
    console.log(data);
    answer = data;
  } catch (err) {
    console.log(err.message);
  }
}

function cesarDecrypt(data = {}) {
  const casas = data.numero_casas;
  const decryptedMessage = decrypStr(casas, data.cifrado);
  return decryptedMessage;
}

function decrypStr(casas = 0, str = '') {
  let decripted = '';
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (isLetter(char)) {
      decripted += decrypLetter(char, casas);
    } else {
      decripted += char;
    }
  }
  return decripted;
}

function decrypLetter(str = 'a', increment = 0) {
  const charsLen = chars.length;
  const currentIndex = chars.findIndex((char) => char === str);
  let newIndex = currentIndex;
  let count = 0;

  while (count < increment) {
    newIndex--;
    if (newIndex === -1) {
      newIndex = charsLen - 1;
    }
    count++;
  }
  const newLetter = chars[newIndex];
  return newLetter;
}

function isLetter(letter = '') {
  return letter.length === 1 && letter.match(/[a-z]/i);
}

function getFile() {
  return utils.readFile(filePath);
}

async function fetchData() {
  try {
    const res = await fetch(
      'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=5183514b41ecb2a4cf2c2959beefc789848c9deb'
    );
    const data = await res.json();
    utils.writeFile(filePath, data);
  } catch (err) {
    throw Error(err);
  }
}

init();
