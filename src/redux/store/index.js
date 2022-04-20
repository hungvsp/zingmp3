import { configureStore } from '@reduxjs/toolkit';
import zSlice from '../slice';
import audio from '../audio';
import video from '../video';
import search from '../search';
import modal from '../modal';

export default configureStore({
  reducer: {
    zSlice,
    audio,
    video,
    search,
    modal,
  },
});
