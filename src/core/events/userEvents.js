export const LOGIN = "@user/login";
export const LOGOUT = "@user/logout";
export const GET_USER = "@user/get-user";

export function login(user) {
  return {
    type: LOGIN,
    payload: {
      user: user,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function getUser(user) {
  return {
    type: GET_USER,
    payload: {
      user,
    },
  };
}
