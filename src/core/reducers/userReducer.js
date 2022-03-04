import { LOGIN, LOGOUT } from "../events/userEvents";
import produce from "immer";
const initialState = {
  user: null,
};
const userReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case LOGIN: {
      return produce(state, (draft) => {
        if (action.payload.user) {
          draft.user = action.payload.user;
        } else draft.user = null;
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
// {
//     name: "",
//     address: "",
//     contact_no: "",
//     email: "",
//     loan_amt: 0.0,
//     start_date: Date.now().toLocaleString(),
//     expiry_date: Date.now().toLocaleString(),
//     emi: 0.0,
//     interest_type: "fixed",
// }
