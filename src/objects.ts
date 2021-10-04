import { commonDataTypes, genericFunction, objectWithStringKeys } from "./types/types"

const getFieldValue = (attrName: string) => (obj: objectWithStringKeys) => obj[attrName]

const demethodize = (fn: genericFunction<any, any>) => (arg0: commonDataTypes, ...args: any[]) => fn.call(arg0, ...args)

const deepFreeze = (obj: objectWithStringKeys) => {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj)
    Object.getOwnPropertyNames(obj).forEach(prop => deepFreeze(obj[prop]))
  }

  return obj
}

const deepCopy = (obj: objectWithStringKeys) => {
  let aux = obj
  if (obj && typeof obj === "object") {
    aux = new Object()
    Object.getOwnPropertyNames(obj).forEach(
      prop => (aux[prop] = deepCopy(obj[prop]))
    )
  }
  return aux
}

const getByPath = (arr: string[], obj: objectWithStringKeys): commonDataTypes => {
  if (arr[0] in obj) {
    return arr.length > 1
      ? getByPath(arr.slice(1), obj[arr[0]])
      : deepCopy(obj[arr[0]])
  } else {
    return undefined
  }
}

export {
  getFieldValue,
  getByPath,
  demethodize,
  deepFreeze,
  deepCopy
}


