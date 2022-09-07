import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { userReducer } from 'components/features/Auth/userSlice';
import { customerReducer } from 'components/features/Customer/customerSlice';
import { integrationsReducer } from 'components/features/Integrations/integrationsSlice';
import { alertReducer } from 'components/features/Alert/AlertSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    alerting: alertReducer,
    customer: customerReducer,
    integrations: integrationsReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
