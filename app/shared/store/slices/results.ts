import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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
    onAddResult: (state, {payload}: PayloadAction<AddResultEventPayload>) => {
      state.ranking.push(payload.result);
    },
  },
});
