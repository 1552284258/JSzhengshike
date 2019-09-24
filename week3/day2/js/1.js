var reg = /^\d?$/   //以0个或1个数字开头
console.log(reg.test('100'));  //false
console.log(reg.test('0'));    //true
console.log(reg.test(''));      //true


var reg = /^\d*$/   //以0个或多个数字开头
console.log(reg.test('100'));  //ture
console.log(reg.test('0'));    //true
console.log(reg.test(''));      //true


var reg = /\d{3}/   //连续出现3个数字
console.log(reg.test('10021312321'));  //ture
console.log(reg.test('qqq12qqqqqqq3'));    //false
console.log(reg.test('qqqqqq333qqq'));      //true

var reg = /^[1.2]$/;    //中括号中的点 就是 点 本事

var reg = /^18|19/;  //以18开头，或者 里面有19 ；  或 的优先级高，它把两边当成了两个整体

var reg = /^(18|19)$/; //   /^18$/ 或者 /^19$/  只能是 18  或者是 只能是 19 
var reg = /^1[89]$/;
 




