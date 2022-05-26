import {DataProvider} from 'ra-core';
import {fetchUtils} from 'react-admin';

/* eslint-disable no-console */
function log(type: any, resource: any, params: any, response: any) {
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!console.group) {
    // Better logging in Chrome
    console.groupCollapsed(type, resource, JSON.stringify(params));
    console.log(response);
    console.groupEnd();
  } else {
    console.log('FakeRest request ', type, resource, params);
    console.log('FakeRest response', response);
  }
}

const apiUrl = process.env.REACT_APP_BASE_URL;
const httpClient = fetchUtils.fetchJson;

interface Options {
  method?: string;
  body?: any;
  headers?: Headers;
}

export default (loggingEnabled = false): DataProvider => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type: any, resource: any, params: any) => {
    let url = '';
    const options: Options = {};
    switch (type) {
      case 'getList': {
        const {page, perPage} = params.pagination;
        const {srchKey, srchVal} = params.filter;
        const {field, order} = params.sort;
        url =
          `${apiUrl}/${resource}` +
          `?pageIndex=${page - 1}` +
          `&pageSize=${perPage}` +
          `&sortKey=${field}` +
          `&order=${order}` +
          `&srchKey=${srchKey === undefined ? '' : srchKey}` +
          `&srchVal=${srchVal === undefined ? '' : srchVal}`;
        options.method = 'GET';
        break;
      }
      case 'getOne':
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'GET';
        break;
      case 'getMany': {
        const query = {
          filter: JSON.stringify({id: params.ids}),
        };
        const idStr = '';
        const queryString = params.ids.map((id: any) => idStr + `id=${id}`);
        url = `${apiUrl}/${resource}?${idStr}}`;
        options.method = 'GET';
        break;
      }
      // case 'getManyReference': {
      //   const {page, perPage} = params.pagination;
      //   url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
      //   break;
      // }
      case 'update':
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      case 'create':
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case 'delete':
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return {url, options};
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (
    response: any,
    type: any,
    resource: any,
    params: any,
  ) => {
    const {headers, json} = response;
    switch (type) {
      case 'getList':
      case 'getManyReference':
        if (!Object.prototype.hasOwnProperty.call(json, 'totalElements')) {
          throw new Error(
            'The numberOfElements property must be must be present in the Json response',
          );
        }
        return {
          data: json.content,
          total: parseInt(json.totalElements, 10),
        };
      case 'create':
        return {data: {...params.data, id: json.id}};
      default:
        return {data: json};
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  // return (type: any, resource: any, params: any) => {
  //   // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  //   if (type === 'updateMany') {
  //     return Promise.all(
  //       params.ids.map((id: any) =>
  //         httpClient(`${apiUrl}/${resource}/${id}`, {
  //           method: 'PUT',
  //           body: JSON.stringify(params.data),
  //         }),
  //       ),
  //     ).then((responses) => ({
  //       data: responses.map((response) => response.json),
  //     }));
  //   }
  //   // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  //   if (type === 'deleteMany') {
  //     return Promise.all(
  //       params.ids.map((id: any) =>
  //         httpClient(`${apiUrl}/${resource}/${id}`, {
  //           method: 'DELETE',
  //         }),
  //       ),
  //     ).then((responses) => ({
  //       data: responses.map((response) => response.json),
  //     }));
  //   }

  // const {url, options} = convertDataRequestToHTTP(type, resource, params);
  // return httpClient(url, options).then((response) =>
  //   convertHTTPResponse(response, type, resource, params),
  // );
  const handle = (type: any, resource: any, params: any): Promise<any> => {
    let response;
    try {
      const {url, options} = convertDataRequestToHTTP(type, resource, params);
      response = httpClient(url, options).then((response) =>
        convertHTTPResponse(response, type, resource, params),
      );
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
    if (loggingEnabled) {
      log(type, resource, params, response);
    }
    return Promise.resolve(response);
  };

  return {
    getList: (resource, params) => handle('getList', resource, params),
    getOne: (resource, params) => handle('getOne', resource, params),
    getMany: (resource, params) => handle('getMany', resource, params),
    getManyReference: (resource, params) =>
      handle('getManyReference', resource, params),
    update: (resource, params) => handle('update', resource, params),
    updateMany: (resource, params) => handle('updateMany', resource, params),
    create: (resource, params) => handle('create', resource, params),
    delete: (resource, params) => handle('delete', resource, params),
    deleteMany: (resource, params) => handle('deleteMany', resource, params),
  };
  // };
};
