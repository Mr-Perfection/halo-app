import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export interface IAlert {
  open: boolean,
  type: AlertColor | undefined,
  message: string,
}

interface IAlertState {
  alert: IAlert,
}

const initialState: IAlertState = {
  alert: {
    open: false,
    type: undefined,
    message: '',
  },
};

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<IAlert>) => ({
      ...state,
      alert: action.payload,
    }),
  },
});

export const { setAlert } = alertSlice.actions;
export const selectAlert = (state: RootState) => state.alerting;
export const alertReducer = alertSlice.reducer;
