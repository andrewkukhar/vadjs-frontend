import { configureStore } from '@reduxjs/toolkit';
import djReducer from './djSlice';
import gigsReducer from './gigsSlice';

export const store = configureStore({
  reducer: {
    djData: djReducer,
    gigs: gigsReducer,
  }
});
