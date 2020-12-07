import calc from './test.js'
// import 在生产环境下 自动去掉没有用到的代码
// tree-shaking 把没用代码自动删除 import有用  require没用
console.log(calc.sum(2,3));

// let calc = require(./test.js)
//console.log(calc.default.sum(2,3))

//scope hosting 作用域提升
let a = 1; 
let b = 2; 
let c = 3; 
let d = a+b+c; //webpack中自动省略一些可以简化代码 d直接为6不会声明之前的abc
console.log(d)
