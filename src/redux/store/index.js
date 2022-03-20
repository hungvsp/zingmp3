import { configureStore } from '@reduxjs/toolkit';
import zSlice from '../slice/zSlice.js';

export default configureStore({
  reducer: {
    zSlice: zSlice,
  },
});