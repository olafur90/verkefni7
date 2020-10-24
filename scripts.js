/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

/**
 * Byrja forrit.
 */
function start() {
  let action = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu „kóða“ eða „afkóða“');

  if(action === 'kóða') {

    let n = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');

    nIsValid(n);

    let stringToEncode = prompt('Gefðu upp strenginn sem á að kóða með hliðrun ${n}').toUpperCase();

    strIsValid(stringToEncode);

    alert(encode(stringToEncode, n));

  } else if(action === 'afkóða') {
    let n = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');

    nIsValid(n);

    let stringToEncode = prompt('Gefðu upp strenginn sem á að kóða með hliðrun ${n}').toUpperCase();

    strIsValid(stringToEncode);

    alert(decode(stringToEncode, n));

  } else {
    alert('Veit ekki hvaða aðgerð „${input}“ er. Reyndu aftur');
    start();
  }

}

function strIsValid(str) {
  let inLetters = true;
  for (let i = 0; i < str.length; i++) { // Athuga hvort strengur innihaldi ólögleg tákn
    if (!LETTERS.includes(str[i]) || str[i] === " ") {
      inLetters = false;
      alert('Ólöglegur stafur í sæti ' + (i + 1));
      start();
    }
  }
}

function nIsValid(n) {
  if (isNaN(n) || n < 1 || n > 31) { // Athuga hvort tala sem gefin er upp sé innan leyfilegra marka
    alert('${input} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.');
    start();
  }
}

// Hér er gott að commenta út til að vinna í encode/decode föllum fyrst og síðan „viðmóti“ forrits
start();

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */

function encode(str, n) {
    let arr = LETTERS.split('');
    let strArr = str.split('');
    let temp = "";

    for (let i = 0; i < strArr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (strArr[i] === arr[j]) {
          temp += arr[(j + parseInt(n)) % LETTERS.length];
          break;
        }
      }
    }
  return temp;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let arr = LETTERS.split('');
  let strArr = str.split('');
  let temp = "";

  for (let i = 0; i < strArr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (strArr[i] === arr[j]) {
        temp += arr[(j - parseInt(n) + LETTERS.length) % LETTERS.length];
        break;
      }
    }
  }
  return temp;
}
console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');

