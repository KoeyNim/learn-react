import boardProvider from './api/boardProvider';
import memberProvider from './api/memberProvider';

// https://stackoverflow.com/a/66347998
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  GET_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin';

const dataProviders = [
  {
    dataProvider: boardProvider,
    resources: ['posts'],
  },
  {
    dataProvider: memberProvider,
    resources: ['user'],
  },
];

export default (type: string, resource: any, params: any) => {
  const dataProviderMapping = dataProviders.find((dp) =>
    dp.resources.includes(resource),
  );

  const mappingType = {
    [GET_LIST]: 'getList',
    [GET_ONE]: 'getOne',
    [GET_MANY]: 'getMany',
    [GET_MANY_REFERENCE]: 'getManyReference',
    [CREATE]: 'create',
    [UPDATE]: 'update',
    [UPDATE_MANY]: 'updateMany',
    [DELETE]: 'delete',
  };

  return dataProviderMapping?.dataProvider['getList'](resource, params);
};
