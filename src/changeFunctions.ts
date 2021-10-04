import { commonDataTypes, genericFunction } from "./types/types"

// Инвертировать результат рассчета функции
const invert = (fn: genericFunction<number, commonDataTypes>): genericFunction<number, commonDataTypes> => (...args) => -fn(...args)
// const testFn = () => 5
// console.log(invert(testFn)())

// Изменить арность функции
const arity = (fn: genericFunction<commonDataTypes, any>, targetArity: number): genericFunction<commonDataTypes, commonDataTypes> => (...args) => fn(...args.slice(0, targetArity))
// console.log(parseInt('100',2)) // 4
// console.log(arity(parseInt, 1)('100',2)) // 100


// Каррирование функции с произвольным числом аргументов
const curry = (fn: genericFunction<commonDataTypes, any>, numOfParams: number = fn.length): genericFunction<any, any> | any => numOfParams === 0 ? fn() : (p: commonDataTypes) => curry(fn.bind(null, p), numOfParams - 1)
const sum = (...args: number[]) => args.reduce((sum, v) => sum + v, 0)
// const curriedSum = curry(sum, 2)
// console.log(curriedSum(1)(2))


// Частичное каррирование
const partialCurry = (fn: genericFunction<commonDataTypes, any>, numOfParams: number = fn.length): genericFunction<any, any> | any => numOfParams === 0 ? fn() : (...args: commonDataTypes[]) => partialCurry(fn.bind(null, ...args), numOfParams - args.length)
// console.log(partialCurry(sum, 5)(1,2)(3)(4,5))

// Частичная фиксация значений аргументов

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
// const makeString = (a: number, b: number, c: number) => String(100 * a + 10 * b + c)
// console.log(partial(makeString)(undefined,undefined,3)(1,2)) // 123

// Варианты перестановки параметров вызываемой функции
 const flipTwo = (fn: genericFunction<commonDataTypes, any>) => (p1: commonDataTypes, p2: commonDataTypes) => fn(p2, p1)
 const flipThree = (fn: genericFunction<commonDataTypes, any>) => (p1: commonDataTypes, p2: commonDataTypes, p3: commonDataTypes) => fn(p2, p1, p3)
// console.log(flipTwo((a, b) => a+b)('one', 'two')) // twoone

// Организовать конвейер из функций

const pipeline = (...fns: genericFunction<commonDataTypes, any>[]) => fns.reduce((resultFunction, nextFunction) => (...args) => nextFunction(resultFunction(...args)))

const multiply = (p: number) => p*2
// console.log(pipeline(sum, multiply)(5, 6, 7)) // 36

// Компановка выполнения функций справа налево
const compose = (...fns: genericFunction<commonDataTypes, any>[]) => pipeline(...(fns.reverse()))
// console.log(compose(multiply, sum)(5, 6, 7)) // 36

export {
  invert,
  arity,
  curry,
  partialCurry,
  partial,
//   flipTwo,
//   flipThree,
//   pipeline,
//   compose
//
}