export const CREATE_UPDATE_LOANS = "@loans/create-update-loans";
export const DELETE_LOANS = "@loans/delete";
export function createUpdateLoan(loans) {
  return {
    type: CREATE_UPDATE_LOANS,
    payload: loans,
  };
}
export function deleteLoans() {
  return {
    type: DELETE_LOANS,
  };
}
