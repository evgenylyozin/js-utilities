import { commonDataTypes, genericFunction } from "./types/types"

const once = (fn: genericFunction<any, any>) => {
  let alreadyCalledOnce = false
  return (...args: commonDataTypes[]) => {
    if(!alreadyCalledOnce) {
      alreadyCalledOnce = true
      fn(...args)
    }
  }
}

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

export {
  once,
  onceAndAfter
}