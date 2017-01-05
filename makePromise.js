function makePromise(fn, ...args) {
    return new Promise((resolve, reject) => {
        fn(...args, (err, ...a) => {
            if(err) {
                reject(err)
            } else {
                resolve(a)
            }
        })
    })
}

module.exports = makePromise
