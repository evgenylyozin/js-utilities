// Данные для тестов
const logSomething = () => console.log('Called the function')
const logSomethingElse = () => console.log('Called the other function')
const findFactorial = n => n === 1 ? 1 : n * findFactorial(n - 1)
let findFibonacciNumber = n => n === 0 ? 0 : n === 1 ? 1 : (findFibonacciNumber(n - 1) + findFibonacciNumber(n - 2))
const testNumberArray = [1,2,3,4,5,6,7,8,9,10]
const testObject = {
  name: 'Евгений',
  surname: 'Лёзин',
  age: 29
}
const testString = 'ЕВгеНий'
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

const logSomethingOnlyOnce = once(logSomething)

logSomethingOnlyOnce()
logSomethingOnlyOnce()

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

const logSomethingOnlyOnceAndSomethingElseAfterwards = onceAndAfter(logSomething, logSomethingElse)

logSomethingOnlyOnceAndSomethingElseAfterwards()
logSomethingOnlyOnceAndSomethingElseAfterwards()
logSomethingOnlyOnceAndSomethingElseAfterwards()

// Возвращает мемоизированную версию переданной функции

const memoize = fn => {
  let cache = {}
  return (...args) => {
    let keyFromArguments = JSON.stringify(args)
    return keyFromArguments in cache
     ? cache[keyFromArguments]
     : (cache[keyFromArguments] = fn(...args))
  }
}

findFibonacciNumber = memoize(findFibonacciNumber)

console.log(findFibonacciNumber(80))

// Вернёт диапазон (массив значений от и до определенного числа включительно)
// только для чисел от 0 и больше
const range = (from, to) => new Array(to - from + 1).fill(0).map((n,i) => from + i)

console.log(range(10, 20))

// Проверить, не подходит ли соответствующее условие под каждый элемент массива

const none = (arr, fn) => arr.every(v => !fn(v))

console.log(none(testNumberArray, v => v < 0))

// Обернуть целевую функцию лог функционалом

const addLogging = (fn, logger = console.log) => (...args) => {
  logger(`Входим в ${fn.name}: ${args}`)
  try {
    const valueToReturn = fn(...args)
    logger(`Выходим из ${fn.name}: ${valueToReturn}`)
    return valueToReturn
  } catch (e) {
    logger(`Выходим из ${fn.name}: с ошибкой - ${e}`);
    throw e;
  }
}

const findFactorialWithLogging = addLogging(findFactorial)
findFactorialWithLogging(10)

// Обернуть функцию функционалом получения таймингов её выполнения

const testPerformance = (fn, logger, timer) => (...args) => {
  const log = logger || ( (text, name, tStart, tEnd) => console.log(`${name} - ${text} ${tEnd - tStart} ms`) )
  const time = timer || ( () => new Date(Date.now()) )
  const tStart = time()

  try {
    const valueToReturn = fn(...args)
    log("Функция успешно отработала", fn.name, tStart, time())
    return valueToReturn
  } catch (e) {
    log(`Во время выполнения функции произошла ошибка: ${e}`, fn.name, tStart, getTime())
    throw e
  }
}

console.log(testPerformance(findFactorial)(47))

// Инвертировать результат рассчета функции

const invert = fn => (...args) => -fn(...args)

console.log(invert(findFactorial)(5))

// Изменить арность функции

const arity = (fn, n) => (...args) => fn(...args.slice(0, n))
console.log(parseInt('100',2))
console.log(arity(parseInt, 1)('100',2))

// Обернуть функцию в промис

const promisify = fn => (...args) => new Promise(
  (resolve, reject) => fn(...args, (err, data) => (err ? reject(err) : resolve(data)))
)

// Получить значение какого-либо атрибута объекта

const getFieldValue = attrName => obj => obj[attrName]

console.log(getFieldValue('age')(testObject))

// Преобразовать метод объекта в функцию

const demethodize = fn => (arg0, ...args) => fn.call(arg0, ...args)

const map = demethodize(Array.prototype.map)
const toUpperCase = demethodize(String.prototype.toUpperCase)

console.log(map(testString, toUpperCase))

// Каррирование функции с произвольным числом аргументов

const curry = (fn, numOfParams = fn.length) => numOfParams === 0 ? fn() : p => curry(fn.bind(null, p), numOfParams - 1)

const sum = (...args) => args.reduce((x,y) => x+y, 0)
console.log(sum(1,2,3,4,5))
console.log(curry(sum, 5)(1)(2)(3)(4)(5))
console.log(curry(sum, 7)(1)(2)(3)(4)(5)(6)(7))

// Частичное каррирование
const partialCurry = (fn, numOfParams = fn.length) => numOfParams === 0 ? fn() : (...args) => partialCurry(fn.bind(null, ...args), numOfParams - args.length)
console.log(partialCurry(sum, 5)(1,2)(3)(4,5))
console.log(partialCurry(sum, 7)(1,2,3)(4,5)(6)(7))

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

const makeString = (a, b, c) => String(100 * a + 10 * b + c)
console.log(partial(makeString)(undefined,undefined,3)(1,2))

// Варианты перестановки параметров вызываемой функции

const flipTwo = fn => (p1, p2) => fn(p2, p1)
const flipThree = fn => (p1, p2, p3) => fn(p2, p1, p3)

// Организовать конвейер из функций

