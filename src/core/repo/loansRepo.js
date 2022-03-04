import { createUpdateLoan } from "../events/loansEvents";

export function updateLoans(loans) {
  return async (dispatch) => {
    try {
      dispatch(createUpdateLoan(loans));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
