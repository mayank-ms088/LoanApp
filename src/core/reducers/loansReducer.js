import produce from "immer";

const { CREATE_UPDATE_LOANS, DELETE_LOANS } = require("../events/loansEvents");
const initialState = {
  loans: [],
};
const loansReducer = (state = initialState, action) => {
  if (action.type === CREATE_UPDATE_LOANS) {
    return produce(state, (draft) => {
      if (!draft.loans || !draft.loans.length) {
        draft.loans = [{ id: 0, ...action.payload }];
      } else {
        draft.loans.push({ id: draft.loans.length, ...action.payload });
      }
    });
  } else if (action.type === DELETE_LOANS) {
    return produce(state, (draft) => {
      draft.loans = [];
    });
  } else {
    return state;
  }
};
export default loansReducer;
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
