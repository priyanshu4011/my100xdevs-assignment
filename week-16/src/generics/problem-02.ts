// Problem Statement:
// Write a function createPair that takes two arguments of any type and returns a tuple with those values.

export function createPair<T, K>(a: T, b: K): [T, K] {
  return [a, b]

}
