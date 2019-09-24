//正则 没有 ^$ 则表示；只要字符串中有符合正则部分即可
//有 ^$ 代表整个字符串 必须全部满足正则条件

//编写一个正则  可以 匹配 有效数组
//可以有 + -号 ；可以有小数， 整数部分不能以0 开头
var reg = /^[+-]?([1-9]\d*|0)(\.\d+)?$/
console.log(reg.test('0123')); //f
console.log(reg.test('10123'));
console.log(reg.test('-10123'));
console.log(reg.test('+123'));
console.log(reg.test('+123.123'));
console.log(reg.test('+123..123'));//f
console.log(reg.test('+0.123'));
console.log(reg.test('+0.')); //f
console.log(reg.test('0'));
console.log(reg.test('q1'));//f
console.log(reg.test('2w'));//f


//匹配手机号 
//手机号1开头
var reg = /^1([3-9]{2})(\d{8})$/
console.log(reg.test('17631227604'));


//匹配qq邮箱的验证
// 至少5位，不能0开头  至多11位； @qq.com
var reg = /^[1-9](\d{4,10})@qq.com$/i
console.log(reg.test('1552284258@qq.com'));


var reg = /^[a-zA-Z]\w{5,17}@$/


//密码8-18位,  即有大写也有小写字母  还得有数字
// var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,18}$/ 
function jbdge(str){
    if(str.length>18||str.length<8)return false
    if(!/[A-Z]/.test(str))return false
    if(!/[a-z]/.test(str))return false
    if(!/\d/.test(str))return false
    return true
}


var reg = /^(1[8-9]|[2-5]\d|6[0-5])$/


var reg = /^\d{6}(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/