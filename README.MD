Использование:

npm i @evgenylyozin/utilityfunctions

import UtilityFunctions from '@evgenylyozin/utilityfunctions'

ИЗМЕНЕНИЕ ПОВЕДЕНИЯ ФУНКЦИИ:

// Инвертировать результат рассчета функции
UtilityFunctions.ChangeFunctions.invert()

const testFn = () => 5
console.log(invert(testFn)()) => -5

// Изменить арность функции
UtilityFunctions.ChangeFunctions.arity()

console.log(parseInt('100',2)) => 4
console.log(arity(parseInt, 1)('100',2)) => 100


// Каррирование функции с произвольным числом аргументов
UtilityFunctions.ChangeFunctions.curry()

const sum = (...args) => args.reduce((sum, value) => sum + value, 0)
const curriedSum = curry(sum, 2)
console.log(curriedSum(1)(2)) => 3


// Частичное каррирование
UtilityFunctions.ChangeFunctions.partialCurry()

console.log(partialCurry(sum, 5)(1,2)(3)(4,5)) => 15

// Частичная фиксация значений аргументов
UtilityFunctions.ChangeFunctions.partial()

const makeString = (a: number, b: number, c: number) => String(100 * a + 10 * b + c)
console.log(partial(makeString)(undefined,undefined,3)(1,2)) => 123

// Варианты перестановки параметров вызываемой функции
UtilityFunctions.ChangeFunctions.flipTwo()
UtilityFunctions.ChangeFunctions.flipThree()

console.log(flipTwo((a, b) => a+b)('one', 'two')) // twoone

// Организовать конвейер из функций
UtilityFunctions.ChangeFunctions.pipeline()

const sum = (...args) => args.reduce((sum, value) => sum + value, 0)
const multiply = (p: number) => p*2
console.log(pipeline(sum, multiply)(5, 6, 7)) // 36

// Компановка выполнения функций справа налево
UtilityFunctions.ChangeFunctions.compose()

const sum = (...args) => args.reduce((sum, value) => sum + value, 0)
const multiply = (p: number) => p*2
console.log(compose(multiply, sum)(5, 6, 7)) // 36

// МЕМОИЗАЦИЯ ФУНКЦИИ
UtilityFunctions.memoize()

let fib = (n: number): number => n <= 1 ? n : fib(n - 1) + fib(n - 2)
fib = memoize(fib)
console.log(fib(50)) => Должно выполниться практически моментально

// КАЖДЫЙ ЭЛЕМЕНТ МАССИВА ДОЛЖЕН НЕ СООТВЕТСТВОВАТЬ УСЛОВИЮ
UtilityFunctions.none()

console.log(none([1,2,3,4,5], (v) => v > 10)) => true

// ВЕРНУТЬ ДИАПАЗОН
UtilityFunctions.range()

console.log(range(1,5)) // [1,2,3,4,5]


// РАБОТА С ОБЪЕКТАМИ

const testObject: objectWithStringKeys = {
  age: 12,
  a: {
    b: 'test'
  }
}
const testString = 'test'

// Получить значение атрибута объекта (shallow)
UtilityFunctions.Objects.getFieldValue()

console.log(getFieldValue('age')(testObject)) => 12

// Получить значение атрибута объекта (deep)
UtilityFunctions.Objects.getByPath()

console.log(getByPath(['a','b'], testObject)) => test

// Преобразовать метод объекта в функцию
UtilityFunctions.Objects.demethodize()

const map = demethodize(Array.prototype.map)
const toUpperCase = demethodize(String.prototype.toUpperCase)
console.log(map(testString, toUpperCase)) => ['T','E','S','T']

// Глубоко заморозить объект
UtilityFunctions.Objects.deepFreeze()

const frozenTestObject = deepFreeze(testObject)
console.log(Object.isFrozen(frozenTestObject.a)) => true

// Создать глубокий клон объекта
UtilityFunctions.Objects.deepCopy()

console.log(deepCopy(testObject).a.b) => test

// ПОЛУЧИТЬ ФУНКЦИЮ, ВЫПОЛНЯЕМУЮ ТОЛЬКО РАЗ

const log1 = () => console.log('Лог 1')
const log2 = () => console.log('Лог 2')

// Вернёт функцию, которая будет выполнена только 1 раз
UtilityFunctions.Once.once()

const log1OnlyOnce = once(log1)
log1OnlyOnce() => Лог 1
log1OnlyOnce() => 

// Вернёт функцию, которая будет выполнена только 1 раз и после этого
// вызов функции вызовет другую логику
UtilityFunctions.Once.onceAndAfter()

const log1OnlyOnceThenLog2AllTheTime = onceAndAfter(log1, log2)

log1OnlyOnceThenLog2AllTheTime() => Лог 1
log1OnlyOnceThenLog2AllTheTime() => Лог 2
log1OnlyOnceThenLog2AllTheTime() => Лог 2

// ОБЁРТКИ

// Обернуть целевую функцию лог функционалом
UtilityFunctions.Wrappers.addLogging()

const returnAnything = (v: any) => v
console.log(addLogging(returnAnything)('anything')) => Лог данные

// Обернуть функцию функционалом получения таймингов её выполнения
UtilityFunctions.Wrappers.testPerformance()

console.log(testPerformance(returnAnything)('anything')) => returnAnything - Функция успешно отработала 0 ms

// Обернуть функцию в промис
UtilityFunctions.Wrappers.promisify()

console.log(promisify(returnAnything)('anything')) => Promise { <pending> }
