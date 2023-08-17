import { configureStore } from '@reduxjs/toolkit';
import djReducer from './djSlice';

export const store = configureStore({
  reducer: {
    djData: djReducer
  }
});
