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

    var n = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');

    if (Number.isNaN(n) || n < 1 || n > 31) { // Athuga hvort tala sem gefin er upp sé innan leyfilegra marka
      alert('${input} er ekki heiltala á bilinu [1, 31]. Reyndu aftur.');
      start();
    }

    var stringToEncode = prompt('Gefðu upp strenginn sem á að kóða með hliðrun ${n}').toUpperCase();

    /*for (let i = 0; i = stringToEncode.length; i++) {
      if (!LETTERS.includes(stringToEncode[i]));
      alert('Ólöglegir stafir');
      start();
    }*/
    alert(stringToEncode);

  } else if(action === 'afkóða') {
    alert('Ok, þú vilt afkóða!');
  } else {
    alert('Veit ekki hvaða aðgerð „${input}“ er. Reyndu aftur');
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
  for (let i = 0; i < str.length; i++) {
    str[i] = LETTERS[(str[i] + n) % LETTERS.length];
  }
  return str;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  return str;
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
