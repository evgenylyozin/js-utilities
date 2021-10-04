// Проверить, не подходит ли соответствующее условие под каждый элемент массива

import { genericFunction } from "./types/types";

export const none = (arr: any[], fn: genericFunction<boolean, any>) => arr.every(v => !fn(v))

console.log(none([1,2,3,4,5], (v) => v > 10))