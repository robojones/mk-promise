const SpecialPromise = require('./SpecialPromise')

function makePromise(fn, ...args) {
    return new SpecialPromise((resolve, reject) => {
        fn(...args, (...a) => {
            resolve(a)
        })
    })
}

module.exports = makePromise
