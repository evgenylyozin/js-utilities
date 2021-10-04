// Получить значение какого-либо атрибута объекта

import { commonDataTypes, genericFunction, objectWithStringKeys } from "./types/types"

const testObject: objectWithStringKeys = {
  age: 12,
  a: {
    b: 'test'
  }
}
const testString = 'test'

const getFieldValue = (attrName: string) => (obj: objectWithStringKeys) => obj[attrName]
console.log(getFieldValue('age')(testObject)) // 12

// Преобразовать метод объекта в функцию
const demethodize = (fn: genericFunction<any, any>) => (arg0: commonDataTypes, ...args: any[]) => fn.call(arg0, ...args)
const map = demethodize(Array.prototype.map)
const toUpperCase = demethodize(String.prototype.toUpperCase)
console.log(map(testString, toUpperCase)) // ['T','E','S','T']

// Глубоко заморозить объект
const deepFreeze = (obj: objectWithStringKeys) => {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj)
    Object.getOwnPropertyNames(obj).forEach(prop => deepFreeze(obj[prop]))
  }

  return obj
}
const frozenTestObject = deepFreeze(testObject)
console.log(Object.isFrozen(frozenTestObject.a)) // true

// Создать глубокий клон объекта

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

console.log(deepCopy(testObject).a.b) // test

// Получить значение поля объекта по пути к полю, в т.ч. и значение поля внутри вложенных объектов

const getByPath = (arr: string[], obj: objectWithStringKeys): commonDataTypes => {
  if (arr[0] in obj) {
    return arr.length > 1
      ? getByPath(arr.slice(1), obj[arr[0]])
      : deepCopy(obj[arr[0]])
  } else {
    return undefined
  }
}

console.log(getByPath(['a','b'], testObject)) // test

export {
  getFieldValue,
  getByPath,
  demethodize,
  deepFreeze,
  deepCopy
}


