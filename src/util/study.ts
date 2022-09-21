//1. 元祖类型实用
function useState<T>(state: T): [T, (newState: T) => void] {
  let currentSate = state;
  const changeState = (newState: T) => {
    currentSate = newState;
  };
  const tuple: [T, (newState: T) => void] = [currentSate, changeState];
  return tuple;
}

const [names, setName] = useState("a");
setName("a");
console.log(names);

//2.
//函数重载：函数的名称相同，但是参数不同的几个函数，就是函数的重载
//依次匹配，没有函数实现体；所有最终会执行第三个
function add(n: number): number;
function add(n: string): string;

/**
 *
 * @param n
 */
function add(n: any): any {
  return n;
}
//需要匹配声明的函数类型 不然不能直接调用
const result = add("1");

//3.索引类型
interface IFrontLanguageType {
  [index: number]: string;
}
const frontLanguage: IFrontLanguageType = {
  0: "js",
  1: "html",
  2: "ts",
  3: "as",
};

// 4。泛型接口 相当于作为参数传给接口

interface IPerson<T1, T2 = string> {
  name: T1;
  age: T2;
}
const person: IPerson<boolean, number> = {
  name: false,
  age: 2,
};

//6.泛型约束
interface IFunc {
  length: number;
}

function func<T extends IFunc>(s: T): T {
  return s;
}
// func(1);

//7 引入第三方库经常会报错 未声明类型 是因为ts有类型管理和查找规则
//解决：在.d.ts文件声明 或者在https://www.typescriptlang.org/dt/search?seacrch=&search=day 查找对应声明文件
