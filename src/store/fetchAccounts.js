import {
  fetchAccountsPending,
  fetchAccountsSuccess,
  fetchAccountsError,
} from "./accountActions";

const accountsAPIUrl = "http://localhost:5000/api/accounts";

const fetchAccounts = () => {
  return (dispatch) => {
    dispatch(fetchAccountsPending());
    fetch(accountsAPIUrl)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchAccountsSuccess(res.accounts));
        return res.accounts;
      })
      .catch((error) => {
        dispatch(fetchAccountsError(error));
      });
  };
};

export default fetchAccounts;
