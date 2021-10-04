import { commonDataTypes, genericFunction, objectWithStringKeys } from "./types/types"

export const memoize = (fn: genericFunction<commonDataTypes, any>) => {
  let cache: objectWithStringKeys = {}
  return (...args: commonDataTypes[]) => {
    let keyFromArguments = JSON.stringify(args)
    return keyFromArguments in cache
     ? cache[keyFromArguments]
     : (cache[keyFromArguments] = fn(...args))
  }
}