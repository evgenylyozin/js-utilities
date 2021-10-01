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

// Обернуть функцию в промис

const promisify = fn => (...args) => new Promise(
  (resolve, reject) => fn(...args, (err, data) => (err ? reject(err) : resolve(data)))
)

export {
  addLogging,
  testPerformance,
  promisify
}