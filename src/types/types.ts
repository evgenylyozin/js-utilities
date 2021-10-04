export type genericFunction<T,A> = (...args: A[]) => T

export type commonDataTypes = number | boolean | object | string | undefined | null

export interface objectWithStringKeys {
  [index: string]: any
}