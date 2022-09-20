// 元祖类型实用
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
