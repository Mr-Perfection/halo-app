import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { DbCredentials } from 'generated/graphql';

interface IIntegrationsState {
  databases: DbCredentials[] | null;
}

const initialState: IIntegrationsState = {
  databases: null,
};

export const integrationsSlice = createSlice({
  name: 'integrationsSlice',
  initialState,
  reducers: {
    setDatabases: (state, action: PayloadAction<DbCredentials[]>) => ({
      ...state,
      databases: action.payload,
    }),
    addDatabase: (state, action: PayloadAction<DbCredentials>) => ({
      ...state,
      databases: state.databases ? [...state.databases, action.payload] : [action.payload],
    }),
    removeDatabase: (state, action: PayloadAction<DbCredentials>) => ({
      ...state,
      databases: state.databases ? state.databases.filter((db) => db.id !== action.payload.id) : [],
    }),
  },
});

export const { addDatabase, removeDatabase, setDatabases } = integrationsSlice.actions;
export const selectIntegrations = (state: RootState) => state.customer;
export const integrationsReducer = integrationsSlice.reducer;
