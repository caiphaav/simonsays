import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {Types} from '@shared';

interface AddResultEventPayload {
  result: Types.IResult;
}

const initialState: Types.IResultsStore = {
  ranking: [],
};

export const resultsSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    onAddResult: {
      reducer: (state, {payload}: PayloadAction<AddResultEventPayload>) => {
        state.ranking.push(payload.result);
      },
      prepare: (data: Types.IResultBasic) => {
        const id = uuidv4();
        return {payload: {result: {...data, id}}};
      },
    },
  },
});
