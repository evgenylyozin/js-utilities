// Возвращает мемоизированную версию переданной функции

export const memoize = (fn) => {
  let cache = {}
  return (...args) => {
    let keyFromArguments = JSON.stringify(args)
    return keyFromArguments in cache
     ? cache[keyFromArguments]
     : (cache[keyFromArguments] = fn(...args))
  }
}