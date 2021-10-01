// Получить значение какого-либо атрибута объекта

const getFieldValue = attrName => obj => obj[attrName]
// getFieldValue('age')(testObject)

// Преобразовать метод объекта в функцию
const demethodize = fn => (arg0, ...args) => fn.call(arg0, ...args)
//const map = demethodize(Array.prototype.map)
//const toUpperCase = demethodize(String.prototype.toUpperCase)
//map(testString, toUpperCase)

// Глубоко заморозить объект
const deepFreeze = obj => {
  if (obj && typeof obj === "object" && !Object.isFrozen(obj)) {
    Object.freeze(obj)
    Object.getOwnPropertyNames(obj).forEach(prop => deepFreeze(obj[prop]))
  }

  return obj
}

// Создать глубокий клон объекта

const deepCopy = obj => {
  let aux = obj
  if (obj && typeof obj === "object") {
    aux = new obj.constructor()
    Object.getOwnPropertyNames(obj).forEach(
      prop => (aux[prop] = deepCopy(obj[prop]))
    )
  }

  return aux
}

// Получить значение поля объекта по пути к полю, в т.ч. и значение поля внутри вложенных объектов

const getByPath = (arr, obj) => {
  if (arr[0] in obj) {
    return arr.length > 1
      ? getByPath(arr.slice(1), obj[arr[0]])
      : deepCopy(obj[arr[0]])
  } else {
    return undefined
  }
}

//getByPath(['a','b'], testObject) === testObject.a.b

export {
  getFieldValue,
  getByPath,
  demethodize,
  deepFreeze,
  deepCopy
}


