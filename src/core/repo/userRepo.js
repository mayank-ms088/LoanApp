import { deleteLoans } from "../events/loansEvents";
import { login, logout } from "../events/userEvents";
export function loginUser(user) {
  return async (dispatch) => {
    try {
      dispatch(login(user));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
export function logoutUser() {
  return async (dispatch) => {
    try {
      dispatch(logout());
      dispatch(deleteLoans());
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
