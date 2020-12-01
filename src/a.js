export default  'hello webpack'; 
require('@babel/polyfill');

class B {

}

function * gen(params) {
    yield 1;
}
console.log(gen().next());

'aaa'.includes('aa');