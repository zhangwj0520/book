//Promise 的三种状态  (满足要求 -> Promise的状态)
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    // //传一个异步函数进来
    constructor(fn) {
        this.status = PENDING
        this.value = undefined
        this.onFulfilledArray = []
        this.onRegectedArray = []

        const resolve = value => {
            if (this.status != PENDING) return
            let timer = setTimeout(() => {
                this.status = FULFILLED
                this.value = value
                this.onFulfilledArray.forEach(fn => fn(this.value))
            })
        }

        const reject = value => {
            if (this.status !== PENDING) return
            let timer = setTimeout(() => {
                this.status = REJECTED
                this.value = value
                this.onRegectedArray.forEach(fn => fn(this.value))
            })
        }
        //捕获构造异常
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    // 解决过程
    resolvePromise(promise2, x, resolve, reject) {
        if (x === promise2) {
          reject(new TypeError('循环引用'));
        }
        if (x instanceof MyPromise) {
          if (x.status === PENDING) {
            x.then(
              y => {
                this.resolvePromise(promise2, y, resolve, reject);
              },
              reason => {
                reject(reason);
              }
            );
          } else {
            x.then(resolve, reject);
          }
        } else if (x && (typeof x === 'function' || typeof x === 'object')) {
          let called = false;
          try {
            let then = x.then;
            if (typeof then === 'function') {
              then.call(
                x,
                y => {
                  if (called) return;
                  called = true;
                  this.resolvePromise(promise2, y, resolve, reject);
                },
                r => {
                  if (called) return;
                  called = true;
                  reject(r);
                }
              );
            } else {
              resolve(x);
            }
          } catch (e) {
            if (called) return;
            called = true;
            reject(e);
          }
        } else {
          resolve(x);
        }
      }
      

    // 1.首先,then方法必须返回一个promise对象
    // 2.如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
    //  3.如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e。
    then(onFulfilled, onRejected) {
        let newPromise
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : reason => {
                      throw reason
                  }

        if (this.status === FULFILLED) {
            return (newPromise = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        this.resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }))
        }
        if (this.status == REJECTED) {
            return (newPromise = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value)
                        this.resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }))
        }
        if (this.status === PENDING) {
            
            return (newPromise = new MyPromise((resolve, reject) => {
                this.onFulfilledArray.push(value => {
                    try {
                        let x = onFulfilled(value)
                        this.resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRegectedArray.push(reason => {
                    try {
                        let x = onRejected(reason)
                        this.resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }))
        }
    }
}

let p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        Math.random() < 0.5 ? resolve(100) : reject(-100)
    }, 1000)
}).then(
    res => {
        console.log(res)
    },
    err => {
        console.log(err)
    }
)
