var reg = /d/;
console.log(reg.test('qwert123456'))  //false
console.log(reg.test('abcddd123456'))  //true

var reg1 = /\d/
console.log(reg1.test('qwert123456'))  //true
console.log(reg1.test('abcddd123456'))  //true

var reg2 = /\\d/
console.log(reg2.test('qwert123456'))  // false
console.log(reg2.test('abc\\ddd123456'))  //true

var reg3 = /\w/
console.log(reg3.test('_'));  //true


var reg4 = /\d?/
console.log(reg4.test('qwertyuijhgfdsazxcvb'));

var reg5 = /\d{2,3}/
console.log(reg5.test('q2werijhgzxcvb'));//false
console.log(reg5.test('q22weruijazxcvb'));//true
console.log(reg5.test('q2253434wsaxcvb'));//true

var reg5 = /^d/
console.log(reg5.test('q2werijhgzxcvb'));//false

var reg5 = /^d/
console.log(reg5.test('dq2werijhgzxcvb'));//true

var reg5 = /^\d/
console.log(reg5.test('1dq2werijhgzxcvb'));//true

var reg5 = /d$/   //以d结尾
console.log(reg5.test('1dq2werijhgzxcvbd'));//false

var reg5 = /d$/  //以数字结尾
console.log(reg5.test('1dq2werijhgzxcvbd'));//false








