
// Инвертировать результат рассчета функции

const invert = fn => (...args) => -fn(...args)

// Изменить арность функции

const arity = (fn, n) => (...args) => fn(...args.slice(0, n))
// parseInt('100',2) // 4
// arity(parseInt, 1)('100',2) // 100


// Каррирование функции с произвольным числом аргументов

const curry = (fn, numOfParams = fn.length) => numOfParams === 0 ? fn() : p => curry(fn.bind(null, p), numOfParams - 1)

// sum(1,2,3,4,5) === curry(sum, 5)(1)(2)(3)(4)(5)


// Частичное каррирование
const partialCurry = (fn, numOfParams = fn.length) => numOfParams === 0 ? fn() : (...args) => partialCurry(fn.bind(null, ...args), numOfParams - args.length)
// partialCurry(sum, 5)(1,2)(3)(4,5) === partialCurry(sum, 7)(1,2,3)(4,5)(6)(7)

// Частичная фиксация значений аргументов

const partial = (fn, ...args) => {
  const partialize = (...args1) => (...args2) => {
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
// const makeString = (a, b, c) => String(100 * a + 10 * b + c)
// partial(makeString)(undefined,undefined,3)(1,2) === 123

// Варианты перестановки параметров вызываемой функции

const flipTwo = fn => (p1, p2) => fn(p2, p1)
const flipThree = fn => (p1, p2, p3) => fn(p2, p1, p3)

// Организовать конвейер из функций

const pipeline = (...fns) => fns.reduce((resultFunction, nextFunction) => (...args) => nextFunction(resultFunction(...args)))
// pipeline(findFibonacciNumber, findFactorial)(5)

// Компановка выполнения функций справа налево
const compose = (...fns) => pipeline(...(fns.reverse()))
// compose(findFibonacciNumber, findFactorial)(3)

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