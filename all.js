// Данные для тестов
const logSomething = () => console.log('Called the function')
const logSomethingElse = () => console.log('Called the other function')
const findFactorial = n => n === 1 ? 1 : n * findFactorial(n - 1)
let findFibonacciNumber = n => n === 0 ? 0 : n === 1 ? 1 : (findFibonacciNumber(n - 1) + findFibonacciNumber(n - 2))
const testNumberArray = [1,2,3,4,5,6,7,8,9,10]
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