import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';

export * as storeActions from './actions';
export const store = configureStore({reducer});
