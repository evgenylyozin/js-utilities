// Вернёт диапазон (массив значений от и до определенного числа включительно)
// только для чисел от 0 и больше
export const range = (from: number, to: number) => new Array(to - from + 1).fill(0).map((n,i) => from + i)

console.log(range(1,5)) // [1,2,3,4,5]