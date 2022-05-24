// Users tab Component
import React from 'react';
import {List, Datagrid, TextField, EmailField, UrlField} from 'react-admin';
import MyUrlField from './MyUrlField';

function UserList() {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone" />
        <MyUrlField source="website" />
        <TextField source="company.name" />
      </Datagrid>
    </List>
  );
}
export default UserList;
