import { commonDataTypes, genericFunction } from "./types/types"

// Вернёт функцию, которая будет выполнена только 1 раз
const once = (fn: genericFunction<any, any>) => {
  let alreadyCalledOnce = false
  return (...args: commonDataTypes[]) => {
    if(!alreadyCalledOnce) {
      alreadyCalledOnce = true
      fn(...args)
    }
  }
}

const log1 = () => console.log('Лог 1')
const log2 = () => console.log('Лог 2')
const log1OnlyOnce = once(log1)

log1OnlyOnce()
log1OnlyOnce()


// Вернёт функцию, которая будет выполнена только 1 раз и после этого
// вызов функции вызовет другую логику
const onceAndAfter = (fnOnce: genericFunction<any, any>, fnAfter: genericFunction<any, any>) => {
  let alreadyCalledOnce = false
  return (...args: commonDataTypes[]) => {
    if(!alreadyCalledOnce) {
      alreadyCalledOnce = true
      fnOnce(...args)
    } else {
      fnAfter(...args)
    }
  }
}

const log1OnlyOnceThenLog2AllTheTime = onceAndAfter(log1, log2)

log1OnlyOnceThenLog2AllTheTime()
log1OnlyOnceThenLog2AllTheTime()
log1OnlyOnceThenLog2AllTheTime()

export {
  once,
  onceAndAfter
}