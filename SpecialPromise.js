class SpecialPromise extends Promise {
    withError() {
        return this.then(a => {
            const error = a.shift()
            if(error) {
                return Promise.reject(error)
            } else {
                return a
            }
        })
    }
}

module.exports = SpecialPromise
