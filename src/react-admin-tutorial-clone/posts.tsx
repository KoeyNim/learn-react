// Posts tab Component
import * as React from 'react';
import {RichTextInput, RichTextInputToolbar} from 'ra-input-rich-text';
import {Theme, useMediaQuery} from '@mui/material';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  Create,
  SimpleList,
  SimpleForm,
  SelectInput,
  TextInput,
  useRecordContext,
  DateField,
} from 'react-admin';

// 게시글 검색 기능
const postFilters = [
  <TextInput source="srchVal" label="검색" alwaysOn />,
  <SelectInput
    source="srchKey"
    label="구분"
    alwaysOn
    emptyText="전체"
    choices={[
      {id: 'userId', name: '작성자'},
      {id: 'title', name: '제목'},
    ]}
  />,
];

// 게시글 리스트 양식
export const PostList = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );
  return (
    // 해당 리스트 검색 필터 추가
    <List filters={postFilters} sort={{field: 'registDate', order: 'DESC'}}>
      {/* // 모바일 화면 */}
      {isMobile ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.count} views`}
          tertiaryText={(record) =>
            new Date(record.registDate).toLocaleDateString()
          }
        />
      ) : (
        // PC 화면
        <Datagrid>
          <TextField label="번호" source="id" sortable={false} />
          {/* <ReferenceField source="userId" reference="userId"> */}
          <TextField label="작성자" source="userId" />
          {/* </ReferenceField> */}
          <TextField label="제목" source="title" />
          <DateField label="작성일" source="registDate" />
          <EditButton />
        </Datagrid>
      )}
    </List>
  );
};

// 페이지 제목 지정 useRecordContext Hook 사용
const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

// 게시글 수정 양식
export const PostEdit = (props: unknown) => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      {/* <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput> */}
      <TextInput disabled source="userId" />
      <TextInput source="title" />
      <RichTextInput
        toolbar={<RichTextInputToolbar size="large" />}
        // imageUploadUrl={process.env.FILE_UPLOAD_URL}
        // baseUrl={process.env.FILE_DOWNLOAD_URL}
        source="content"
      />
    </SimpleForm>
  </Edit>
);

// 게시글 등록 양식
export const PostCreate = (props: unknown) => (
  <Create {...props}>
    <SimpleForm>
      {/* <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput> */}
      <TextInput disabled source="userId" />
      <TextInput source="title" />
      <RichTextInput
        toolbar={<RichTextInputToolbar size="large" />}
        // imageUploadUrl={process.env.FILE_UPLOAD_URL}
        // baseUrl={process.env.FILE_DOWNLOAD_URL}
        source="content"
      />
    </SimpleForm>
  </Create>
);
