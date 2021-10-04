import { commonDataTypes, genericFunction } from "./types/types"

const invert = (fn: genericFunction<number, commonDataTypes>): genericFunction<number, commonDataTypes> => (...args) => -fn(...args)

const arity = (fn: genericFunction<commonDataTypes, any>, targetArity: number): genericFunction<commonDataTypes, commonDataTypes> => (...args) => fn(...args.slice(0, targetArity))

const curry = (fn: genericFunction<commonDataTypes, any>, numOfParams: number = fn.length): genericFunction<any, any> | any => numOfParams === 0 ? fn() : (p: commonDataTypes) => curry(fn.bind(null, p), numOfParams - 1)

const partialCurry = (fn: genericFunction<commonDataTypes, any>, numOfParams: number = fn.length): genericFunction<any, any> | any => numOfParams === 0 ? fn() : (...args: commonDataTypes[]) => partialCurry(fn.bind(null, ...args), numOfParams - args.length)

const partial = (fn: genericFunction<commonDataTypes, any>, ...args: commonDataTypes[]) => {
  const partialize = (...args1: commonDataTypes[]) => (...args2: commonDataTypes[]): genericFunction<any, any> | any => {
    for (let i = 0; i < args1.length && args2.length; i++) {
      if (args1[i] === undefined) {
        args1[i] = args2.shift()
      }
    }

    const allParams = [...args1, ...args2]
    return (allParams.includes(undefined) || allParams.length < fn.length
      ? partialize
      : fn)(...allParams)
  }

  return partialize(...args)
}

const flipTwo = (fn: genericFunction<commonDataTypes, any>) => (p1: commonDataTypes, p2: commonDataTypes) => fn(p2, p1)
const flipThree = (fn: genericFunction<commonDataTypes, any>) => (p1: commonDataTypes, p2: commonDataTypes, p3: commonDataTypes) => fn(p2, p1, p3)

const pipeline = (...fns: genericFunction<commonDataTypes, any>[]) => fns.reduce((resultFunction, nextFunction) => (...args) => nextFunction(resultFunction(...args)))

const compose = (...fns: genericFunction<commonDataTypes, any>[]) => pipeline(...(fns.reverse()))

export {
  invert,
  arity,
  curry,
  partialCurry,
  partial,
  flipTwo,
  flipThree,
  pipeline,
  compose
}