import {
  fetchAccountsPending,
  fetchAccountsSuccess,
  fetchAccountsError,
  addAccount,
  editAccount,
  deleteAccount,
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

export const asyncAddAccount = (
  account,
  redirect,
  resetForm,
  stopBtnLoader
) => {
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
          dispatch(fetchAccountsError(err));
          stopBtnLoader();
        }
      )
      .then((account) => {
        console.log(account);
        dispatch(addAccount(account));
        redirect();
        resetForm();
      });
  };
};

export const asyncEditAccount = (id, account, redirect, resetForm, stopBtnLoader) => {
  return (dispatch) => {
    dispatch(fetchAccountsPending());
    fetch(accountsAPIUrl + `/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify(account),
    })
      .then(
        (res) => res.json(),
        (err) => {
          console.log(`An error occured: ${err}`);
          dispatch(fetchAccountsError(err));
          stopBtnLoader();
        }
      )
      .then((account) => {
        console.log(account);
        dispatch(editAccount(id, account));
        redirect();
        resetForm();
      });
  };
};

export const asyncDeleteAccount = (id) => {
  return (dispatch) => {
    dispatch(fetchAccountsPending());
    fetch(accountsAPIUrl + `/${id}`, {
      method: "DELETE",
    }).then(
      (res) => {
        dispatch(deleteAccount(id));
      },
      (err) => {
        console.log(`An error occured: ${err}`);
        dispatch(fetchAccountsError(err));
      }
    );
  };
};
