import { genericFunction } from "./types/types";

export const none = (arr: any[], fn: genericFunction<boolean, any>) => arr.every(v => !fn(v))
