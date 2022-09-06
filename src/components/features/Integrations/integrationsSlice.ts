import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { DbCredentials } from 'generated/graphql';

interface IIntegrationsState {
  databases: DbCredentials[];
}

const initialState: IIntegrationsState = {
  databases: [],
};

export const integrationsSlice = createSlice({
  name: 'integrationsSlice',
  initialState,
  reducers: {
    addDatabase: (state, action: PayloadAction<DbCredentials>) => ({
      ...state,
      databases: [...state.databases, action.payload],
    }),
  },
});

export const { addDatabase } = integrationsSlice.actions;
export const selectIntegrations = (state: RootState) => state.customer;
export const integrationsReducer = integrationsSlice.reducer;
