// Обернуть целевую функцию лог функционалом

import { commonDataTypes, genericFunction } from "./types/types"

const addLogging = (fn: genericFunction<any, any>, logger = console.log) => (...args: commonDataTypes[]) => {
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

const returnAnything = (v: any) => v

console.log(addLogging(returnAnything)('anything'))

// Обернуть функцию функционалом получения таймингов её выполнения

const testPerformance = (fn: genericFunction<any, any>, logger?: genericFunction<any, any>, timer?: genericFunction<void, any>) => (...args: commonDataTypes[]) => {
  const log = logger || ( (text, name, tStart, tEnd) => console.log(`${name} - ${text} ${tEnd - tStart} ms`) )
  const time = timer || ( () => new Date(Date.now()) )
  const tStart = time()

  try {
    const valueToReturn = fn(...args)
    log("Функция успешно отработала", fn.name, tStart, time())
    return valueToReturn
  } catch (e) {
    log(`Во время выполнения функции произошла ошибка: ${e}`, fn.name, tStart, time())
    throw e
  }
}

console.log(testPerformance(returnAnything)('anything'))

// Обернуть функцию в промис

const promisify = (fn: genericFunction<any, any>) => (...args: commonDataTypes[]) => new Promise(
  (resolve, reject) => fn(...args, (err: any, data: any) => (err ? reject(err) : resolve(data)))
)

console.log(promisify(returnAnything)('anything'))

export {
  addLogging,
  testPerformance,
  promisify
}