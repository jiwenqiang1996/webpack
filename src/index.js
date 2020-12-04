
let xhr = new XMLHttpRequest();
// const webpack = require('webpack');
// console.log(webpack,'2323');

// 默认 http://localhost:8080
xhr.open('GET','/api/user',true);

xhr.onload = function () {
    console.log(xhr.response);
}

xhr.send();

let url = '';

if (DEV === 'dev') {
    url='local';
} else {
    url='product'
}

console.log(url);