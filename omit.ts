namespace omit {
  type Omit2<T, K extends string | number | symbol> = {
    [P in keyof T as Exclude<P, K>]: T[P];
  }
  type A = {
    a: number
    b: string
    1: number
    2: string
    [key: number]: unknown
    [key: string]: unknown
  }
  type C = Omit2<A, 'a' | 2 | 'x'>
}