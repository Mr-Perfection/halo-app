import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { Customer } from 'generated/graphql';

interface ICustomerState {
  customer: Customer | null;
}

const initialState: ICustomerState = {
  customer: null,
};

export const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<Customer>) => ({
      ...state,
      customer: action.payload,
    }),
  },
});

export const { setCustomer } = customerSlice.actions;
export const selectCustomer = (state: RootState) => state.customer;
export const customerReducer = customerSlice.reducer;
