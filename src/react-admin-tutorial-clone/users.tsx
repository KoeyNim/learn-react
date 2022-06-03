// Posts tab Component
import * as React from 'react';
import {Theme, useMediaQuery} from '@mui/material';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SimpleList,
  SelectInput,
  TextInput,
  useRecordContext,
  DateField,
} from 'react-admin';

// 게시글 검색 기능
const userFilters = [
  <TextInput source="srchVal" label="검색" alwaysOn />,
  <SelectInput
    source="srchKey"
    label="구분"
    alwaysOn
    emptyText="전체"
    choices={[
      {id: 'userId', name: '사용자'},
      {id: 'userName', name: '이름'},
    ]}
  />,
];

// 게시글 리스트 양식
export const UsersList = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );
  return (
    // 해당 리스트 검색 필터 추가
    <List filters={userFilters} sort={{field: 'id', order: 'DESC'}}>
      {/* // 모바일 화면 */}
      {isMobile ? (
        <SimpleList
          primaryText={(record) => [
            record.userId,
            record.userName,
            record.email,
          ]}
        />
      ) : (
        // PC 화면
        <Datagrid>
          <TextField label="번호" source="id" sortable={false} />
          {/* <ReferenceField source="userId" reference="userId"> */}
          <TextField label="아이디" source="userId" />
          <TextField label="이름" source="userName" />
          <TextField label="나이" source="age" />
          <TextField label="성별" source="gender" />
          <TextField label="이메일" source="email" />
          {/* </ReferenceField> */}
          {/* <TextField label="제목" source="title" />
          <DateField label="작성일" source="registDate" /> */}
        </Datagrid>
      )}
    </List>
  );
};

// 페이지 제목 지정 useRecordContext Hook 사용
const UsersTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};
