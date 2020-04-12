const ADD_ACCOUNT = "ADD_ACCOUNT";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";
const EDIT_ACCOUNT = "EDIT_ACCOUNT";
const FETCH_ACCOUNTS_PENDING = "FETCH_ACCOUNTS_PENDING";
const FETCH_ACCOUNTS_SUCCESS = "FETCH_ACCOUNTS_SUCCESS";
const FETCH_ACCOUNTS_ERROR = "FETCH_ACCOUNTS_ERROR";

export const addAccount = (account) => {
    return {
        type: ADD_ACCOUNT,
        account
    }
}

export const deleteAccount = (id) => {
    return {
        type: DELETE_ACCOUNT,
        id
    }
}

export const editAccount = (id, account) => {
    return {
        type: EDIT_ACCOUNT,
        id,
        account
    }
}

export const fetchAccountsPending = () => {
    return {
        type: FETCH_ACCOUNTS_PENDING
    }
}

export const fetchAccountsSuccess = (accounts) => {
    return {
        type: FETCH_ACCOUNTS_SUCCESS,
        accounts
    }
}

export const fetchAccountsError = (error) => {
    return {
        type: FETCH_ACCOUNTS_ERROR,
        error
    }
}