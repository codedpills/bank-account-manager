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
      .then(
        (res) => res.json(),
        (err) => {
          console.log(`There was an error: ${err}`);
          dispatch(fetchAccountsError(err));
        }
      )
      .then((accounts) => {
        console.log(accounts);
        dispatch(fetchAccountsSuccess(accounts));
      });
  };
};

export default fetchAccounts;
