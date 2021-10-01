// Вернёт функцию, которая будет выполнена только 1 раз
const once = fn => {
  let alreadyCalledOnce = false
  return (...args) => {
    if(!alreadyCalledOnce) {
      alreadyCalledOnce = true
      fn(...args)
    }
  }
}

// Вернёт функцию, которая будет выполнена только 1 раз и после этого
// вызов функции вызовет другую логику
const onceAndAfter = (fnOnce, fnAfter) => {
  let alreadyCalledOnce = false
  return (...args) => {
    if(!alreadyCalledOnce) {
      alreadyCalledOnce = true
      fnOnce(...args)
    } else {
      fnAfter(...args)
    }
  }
}

export {
  once,
  onceAndAfter
}