import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { User } from 'generated/graphql';

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const userReducer = userSlice.reducer;
