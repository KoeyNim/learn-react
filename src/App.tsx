import * as React from 'react';
import {Admin, Resource, ListGuesser, EditGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {MemberList} from './react-admin-tutorial-clone/member/member';
import {
  BoardList,
  BoardEdit,
  BoardCreate,
} from './react-admin-tutorial-clone/board/board';
import Dashboard from './react-admin-tutorial-clone/Dashboard';
import authProvider from 'react-admin-tutorial-clone/authProvider';
import dataProvider from 'react-admin-tutorial-clone/dataProvider';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import {MyLayout} from './react-admin-tutorial-clone/DevtoolsLayout';

// 분리되어 있는 컴포넌트를 모아 배치
const App = () => {
  // data db 경로
  // const dataProvider = jsonServerProvider(
  //   'https://jsonplaceholder.typicode.com',
  // );
  return (
    <div className="App">
      {/* 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구 */}
      <React.StrictMode>
        {/* 대시보드, 사용자인증, 데이터 제어 */}
        <Admin
          dashboard={Dashboard}
          // authProvider={authProvider}
          dataProvider={dataProvider}
          layout={MyLayout}
        >
          {/* Posts의 list, edit, create, icon 추가 */}
          <Resource
            name="board"
            list={BoardList}
            edit={BoardEdit}
            create={BoardCreate}
            icon={PostIcon}
            options={{label: '게시물'}}
          />
          {/*  Users의 list, icon 추가  */}
          <Resource
            name="member"
            list={MemberList}
            icon={UserIcon}
            options={{label: '사용자'}}
          />
        </Admin>
      </React.StrictMode>
    </div>
  );
};

export default App;
