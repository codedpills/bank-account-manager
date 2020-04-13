import {
  fetchAccountsPending,
  fetchAccountsSuccess,
  fetchAccountsError,
  addAccount,
} from "./accountActions";

const accountsAPIUrl = "http://localhost:5000/api/accounts";

export const asyncFetchAccounts = () => {
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

export const asyncAddAccount = (account) => {
  return (dispatch) => {
    dispatch(fetchAccountsPending());
    fetch(accountsAPIUrl, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify(account),
    })
      .then(
        (res) => res.json(),
        (err) => {
          console.log(`An error occured: ${err}`);
        }
      )
      .then((account) => {
        console.log(account);
        dispatch(addAccount(account));
      });
  };
};
