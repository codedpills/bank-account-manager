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
      .then((res) => res.json())
      .then((accounts) => {
        console.log(accounts);
        dispatch(fetchAccountsSuccess(accounts));
      })
      .catch((err) => {
        console.log(`There was an error: ${err}`);
        dispatch(
          fetchAccountsError(
            `${err}! Please check your connection and reload the page to try again.`
          )
        );
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
      .then((res) => res.json())
      .then((account) => {
        console.log(account);
        dispatch(addAccount(account));
        resetForm();
        redirect();
      })
      .catch((err) => {
        console.log(`An error occured: ${err}`);
        dispatch(
          fetchAccountsError(
            `${err}! Please check your connection and try again.`
          )
        );
        stopBtnLoader();
      });
  };
};

export const asyncEditAccount = (
  id,
  account,
  redirect,
  resetForm,
  stopBtnLoader
) => {
  return (dispatch) => {
    dispatch(fetchAccountsPending());
    fetch(accountsAPIUrl + `/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify(account),
    })
      .then((res) => res.json())
      .then((account) => {
        console.log(account);
        dispatch(editAccount(id, account));
        redirect();
        resetForm();
      })
      .catch((err) => {
        console.log(`An error occured: ${err}`);
        dispatch(
          fetchAccountsError(
            `${err}! Please check your connection and try again.`
          )
        );
        stopBtnLoader();
      });
  };
};

export const asyncDeleteAccount = (id) => {
  return (dispatch) => {
    dispatch(fetchAccountsPending());
    fetch(accountsAPIUrl + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        dispatch(deleteAccount(id));
      })
      .catch((err) => {
        console.log(`An error occured: ${err}`);
        dispatch(
          fetchAccountsError(
            `${err}! Please check your connection and try again.`
          )
        );
      });
  };
};
