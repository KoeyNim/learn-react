import React, {useState} from 'react';

function Counter() {
  // useState 사용시 제너릭 number를 사용하지 않아도 자동으로 잡아주기 때문에 쓰지 않아도 상관없다.
  // 상태가 null 값이 들어올수 있는 경우 제너릭을 사용한다.
  // const [count, setCount] = useState<number>(0);
  const [count, setCount] = useState(0);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
}

export default Counter;
