# mk-promise - don't use callbacks - use promises

## Installation

`npm i mk-promise`

## Example - without error-handling

```javascript
// require mk-promise
const promify = require('mk-promise')

// an example function with callback
function asyncFunction(value1, value2, callback) {
    callback(value1 + value2, 'another value')
}

// make a promise that resolves when the callback gets called
promify(asyncFunction, 10, 5).then(r => {
    console.log(r[0] === 15) //true
})
```

```javascript
// require mk-promise
const promify = require('mk-promise')

// an example function with callback
function asyncFunction(value, callback) {

    if(typeof value === 'number') {
        callback(value + 1)
    } else {
        //first argument of the callback is an error
        callback(new Error('horrible things happened'))
    }
}

//make a promise that gets rejected
promify(asyncFunction, false).withError().catch(error => {
    console.log(error) //horrible things happened
})

//this promise gets resolved
promify(asyncFunction, 100).withError().then(r => {
    console.log(r[0] === 101) //true
})
```

## makePromise(asyncFn, ...args)

- __asyncFn__ \<Function\> - asynchronous function that needs a callback as last argument
- __...args__ \<any\> - arguments for asyncFn

__returns__ \<SpecialPromise\>

## Class: SpecialPromise

This class extends Promise. You can use the default '.then()' and '.catch()' methods.

### promise.withError()

__returns__ a \<Promise\>. If the first argument (converted to a Boolean) is true, the promise gets rejected with the first argument.
