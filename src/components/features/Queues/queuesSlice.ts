import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/store';
import { Queue } from 'generated/graphql';

interface IQueuesState {
  queues: Queue[] | null;
}

const initialState: IQueuesState = {
  queues: null,
};

export const queuesSlice = createSlice({
  name: 'queuesSlice',
  initialState,
  reducers: {
    addQueue: (state, action: PayloadAction<Queue>) => ({
      ...state,
      queues: state.queues ? [...state.queues, action.payload] : [action.payload],
    }),
    updateQueue: (state, action: PayloadAction<Queue>) => ({
      ...state,
      queues: state.queues?.map((q) => {
        if (q.id !== action.payload.id) {
          return action.payload;
        }
        return q;
      }) ?? [],
    }),
    setQueues: (state, action: PayloadAction<Queue[]>) => ({
      ...state,
      queues: action.payload,
    }),
    removeQueue: (state, action: PayloadAction<Queue>) => ({
      ...state,
      queues: state.queues?.filter((q) => q.id !== action.payload.id) ?? [],
    }),
  },
});

export const {
  addQueue, updateQueue, removeQueue, setQueues,
} = queuesSlice.actions;
export const selectQueues = (state: RootState) => state.queues;
export const queuesReducer = queuesSlice.reducer;
