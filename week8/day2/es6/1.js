/* 
import qqq from './2.js'  //导入1
console.log(qqq)

qqq.f() 

*/

/* 
import * as qqq from './2.js'
let { ary:arr,f} = qqq
console.log(qqq)
console.log(arr)
 */

import { f, ary } from './2.js'
f()
console.log(ary);
