namespace maxdepth {
  type NumLiteral = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  type StoT<S extends string> = S extends "" ? [] : S extends `${infer X}${infer I}` ? [X, ...StoT<I>] : never
  type Length<S extends number> = StoT<`${S}`>["length"]
  type _Bigger<A extends NumLiteral, B extends NumLiteral> = A extends B ? false : B extends '9' ? false :
    B extends '8' ? A extends '9' ? true : false :
    B extends '7' ? A extends '9' | '8' ? true : false :
    B extends '6' ? A extends '9' | '8' | '7' ? true : false :
    B extends '5' ? A extends '9' | '8' | '7' | '6' ? true : false :
    B extends '4' ? A extends '3' | '2' | '1' | '0' ? false : true :
    B extends '3' ? A extends '2' | '1' | '0' ? false : true :
    B extends '2' ? A extends '1' | '0' ? false : true :
    B extends '1' ? A extends '0' ? false : true :
    A extends '0' ? false : true

  type YYBigger<A extends string, B extends string> = A extends `${infer X}${infer Y}` ?
    B extends `${infer X2}${infer Y2}` ?
    _Bigger<X & NumLiteral, X2 & NumLiteral> extends true ? true :
    X extends X2 ?
    YYBigger<Y, Y2> : false : false : false

  type Bigger<A extends number, B extends number> = A extends B ? false :
    Length<A> extends Length<B> ?
    YYBigger<`${A}`, `${B}`> extends true ? true : false :
    Bigger<Length<A>, Length<B>> extends true ? true : false;

  type MaxDepth<S extends string, Arr extends number[] = [1], MAX extends number = 0> = S extends "" ? MAX :
    S extends `${infer C}${infer O}` ?
    C extends '(' ? MaxDepth<O, [1, ...Arr], Bigger<Arr['length'], MAX> extends true ? Arr['length'] : MAX> :
    C extends ')' ? MaxDepth<O, Arr extends [infer _, ...infer J] ? J : [], MAX> :
    MaxDepth<O, Arr, MAX> : never


  type Test1 = MaxDepth<"(1+(2*3)+((8)/4))+1">


  type Test2 = MaxDepth<"(1)+((2))+(((3)))">


  type Test3 = MaxDepth<"1+(2*3)/(2-1)">
}