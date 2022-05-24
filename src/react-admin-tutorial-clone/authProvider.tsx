// 로그인 인증
export default {
  // 로그인을 시도할 경우 호출
  login: ({username}: any) => {
    localStorage.setItem('username', username);
    return Promise.resolve();
  },
  // 로그아웃 버튼을 클릭할 경우 호출
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  // 401, 403 오류가 발생할 경우 호출
  checkError: ({status}: any) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // 사용자가 인증을 확인하기 위해 새로운 위치로 이동할 때 호출
  checkAuth: () => {
    return localStorage.getItem('username')
      ? Promise.resolve()
      : Promise.reject();
  },
  // 사용자가 권한 및 역할을 확인하기 위해 새로운 위치로 이동할 때 호출
  getPermissions: () => Promise.resolve(),
};
