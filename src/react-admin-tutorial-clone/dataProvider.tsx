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
  DELETE_MANY,
} from 'react-admin';

interface MappingType {
  // 인덱스 시그니처
  [prop: string]: any;
}

const dataProviders: Array<any> = [
  {
    dataProvider: boardProvider(true),
    resources: ['posts'],
  },
  {
    dataProvider: memberProvider,
    resources: ['user'],
  },
];

export default (type: any, resource: unknown, params: unknown) => {
  const dataProviderMapping = dataProviders.find((dp: any) =>
    dp.resources.includes(resource),
  );

  const mappingType: MappingType = {
    [GET_LIST]: 'getList',
    [GET_ONE]: 'getOne',
    [GET_MANY]: 'getMany',
    [GET_MANY_REFERENCE]: 'getManyReference',
    [CREATE]: 'create',
    [UPDATE]: 'update',
    [UPDATE_MANY]: 'updateMany',
    [DELETE]: 'delete',
    [DELETE_MANY]: 'deleteMany',
  };

  return dataProviderMapping?.dataProvider[mappingType[type]](resource, params);
};
