const promify = require('./../makePromise')

const assert = require('assert')

describe('makePromise(asyncFn, ...args)', function () {

    const ARGUMENTS = [200, 'example string']

    it('should return a promise', function () {
        assert(promify(() => {}) instanceof Promise)
    })

    it('should provide a callback to asyncFn as last argument', function () {
        return promify((...args) => {
            const cb = args.pop()
            assert.deepEqual(typeof cb, 'function')
            cb()

        })
    })

    it('should call the asyncFn with the args as arguments', function () {
        return promify((...args) => {

            assert.deepEqual(args.slice(0, ARGUMENTS.length), ARGUMENTS)

            const cb = args.pop()
            cb()
        }, ...ARGUMENTS)
    })

    beforeEach(function () {
        this.asyncFn = function (wrong, something, cb) {
            if(wrong) {
                cb(new Error('bad bad things happened'))
            } else {
                cb(null, ...ARGUMENTS)
            }
        }
    })

    it('should reject the promise if asyncFn is not a function', function () {
        promify('no function', false, 'example').then(() => {
            assert(new Error('promise resolved'))
        }).catch(err => {

        })
    })

    it('should resolve the promise', function () {
        return promify(this.asyncFn, false, 'example').then(r => {
            assert.deepEqual(r.slice(1), ARGUMENTS)
        })
    })

    describe('SpecialPromise', function () {
        it('should reject the promise with the first argument of the callback', function (cb) {
            promify(this.asyncFn, true, 'example').withError().then(r => {
                cb(new Error('promise not rejected'))
            }).catch(err => {
                cb()
            })
        })

        it('should resolve the promise with the arguments of the callback (as array)', function () {
            return promify(this.asyncFn, false, 'example').withError().then(args => {
                assert.deepEqual(args, ARGUMENTS)
            })
        })
    })

})
