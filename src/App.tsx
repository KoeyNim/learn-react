import * as React from 'react';
import {Admin, Resource, ListGuesser, EditGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserList from './react-admin-tutorial-clone/users';
import {
  PostList,
  PostEdit,
  PostCreate,
} from './react-admin-tutorial-clone/posts';
import Dashboard from './react-admin-tutorial-clone/Dashboard';
import authProvider from 'react-admin-tutorial-clone/authProvider';
import dataProvider from 'react-admin-tutorial-clone/dataProvider';
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import {MyLayout} from './react-admin-tutorial-clone/DevtoolsLayout';

// 분리되어 있는 컴포넌트를 모아 배치
function App() {
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
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
          />
          {/*  Users의 list, icon 추가  */}
          <Resource name="users" list={UserList} icon={UserIcon} />
        </Admin>
      </React.StrictMode>
    </div>
  );
}

export default App;
