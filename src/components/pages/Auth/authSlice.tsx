import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'generated/graphql';
import { RootState } from 'store';

export interface IAuth {
  loading: boolean;
  user?: User;
}

const initialState: IAuth = { loading: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    start: (state) => ({
      ...state,
      loading: true,
    }),
    success: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
      loading: false,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error: (state, action: PayloadAction<User>) => ({
      ...state,
      loading: false,
    }),
  },
});

export const { start, success, error } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
