import { v4 as uuid } from "uuid";

import {
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  FETCH_ACCOUNTS_PENDING,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_ERROR,
} from "./accountActions";

const initialState = {
  pending: false,
  error: null,
  accounts: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_PENDING:
      return { ...state, pending: true };
    case FETCH_ACCOUNTS_SUCCESS:
      return { ...state, pending: false, accounts: action.accounts };
    case FETCH_ACCOUNTS_ERROR:
      return { ...state, pending: false, error: action.error };
    case ADD_ACCOUNT:
      const newAccount = {
        id: uuid(),
        account_name: action.account.account_name,
        account_number: action.account.account_number,
        account_type: action.account.account_type,
        bank_name: action.account.bank_name,
        bank_branch: action.account.bank_branch,
      };
      return { ...state, accounts: [...state.accounts, newAccount] };
    case DELETE_ACCOUNT:
      const filteredAccounts = state.accounts.filter(
        (account) => account.id !== action.id
      );
      return { ...state, accounts: filteredAccounts };
    case EDIT_ACCOUNT:
      const editedAccounts = state.accounts.map((account) => {
        if (account.id === action.id) {
          return {
            id: account.id,
            account_name: action.account.account_name,
            account_number: action.account.account_number,
            account_type: action.account.account_type,
            bank_name: action.account.bank_name,
            bank_branch: action.account.bank_branch,
          };
        }
        return account;
      });
      return { ...state, accounts: editedAccounts };
    default:
      return state;
  }
};

export default accountReducer;
