import { commonDataTypes, genericFunction, objectWithStringKeys } from "./types/types"

// Возвращает мемоизированную версию переданной функции

export const memoize = (fn: genericFunction<commonDataTypes, any>) => {
  let cache: objectWithStringKeys = {}
  return (...args: commonDataTypes[]) => {
    let keyFromArguments = JSON.stringify(args)
    return keyFromArguments in cache
     ? cache[keyFromArguments]
     : (cache[keyFromArguments] = fn(...args))
  }
}

let fib = (n: number): number => n <= 1 ? n : fib(n - 1) + fib(n - 2)

fib = memoize(fib)

console.log(fib(50))