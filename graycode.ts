namespace graycode {
  type Minus = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  type Reverse<T extends unknown[], K extends unknown[], Ret extends unknown[] = []>
    = T extends [infer I, ...infer J] ? I extends unknown[] ? Reverse<J, K, [[...I, ...K], ...Ret]> : never : Ret

  type GrayCode<N extends number, K extends number[] = [1], Ret extends number[][] = [[]]> =
    N extends 0 ? { [key in keyof Ret]: Ret[key] extends number[] ? Ret[key]["length"] : Ret[key] } :
    GrayCode<Minus[N], [...K, ...K], [...Ret, ...Reverse<Ret, K>]>

  type Test2 = GrayCode<2>

  type Test3 = GrayCode<3>

  type Test8 = GrayCode<8>
}