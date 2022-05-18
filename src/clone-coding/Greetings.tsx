import React from 'react';
import {Button} from '@mui/material';

// 타입 지정
type GreetingsProps = {
  name: string; // 타입 string으로 지정
  mark?: string; // ?를 입력시 속성값이 필수로 들어가지 않아도 상관없음.
  optional?: string;
  onClick: (name: string) => void;
};

// const Greetings: React.FC<GreetingsProps> = ({name, mark, optional}) => (
//   <div>
//     Hello, {name} {mark}
//     {optional && <p>{optional}</p>}
//   </div>
// );

function Greetings({name, mark, optional, onClick}: GreetingsProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <Button variant="contained" onClick={handleClick}>
          Click Me
        </Button>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!',
};

// export default Greetings;
export default Greetings;
