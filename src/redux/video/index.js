import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_GET_VIDEO } from '../../constants/urlApi';
const saveStorage = (state) => {
  localStorage.setItem('video', JSON.stringify(state));
};
const initalDataStr = localStorage.getItem('video');
const initalData = initalDataStr
  ? JSON.parse(initalDataStr)
  : {
      timePlayed: 0,
      volume: 1,
      isMute: false,
      isPlay: true,
      sources: [],
      videoCurrent: {},
      data: {},
      recommends: [],
      isLoadedAvarta: false,
    };
export const video = createSlice({
  name: 'video',
  initialState: initalData,
  reducers: {
    hanldeGetSources(state, action) {
      state.sources = action.payload;
      state.isLoadedAvarta = false;
      saveStorage({
        ...state,
        sources: action.payload,
        isLoadedAvarta: false,
      });
    },
    hanldeChangeVideoCurrent(state, action) {
      state.videoCurrent = action.payload;
      saveStorage({
        ...state,
        videoCurrent: action.payload,
        isLoadedAvarta: false,
      });
    },
    hanldeChangeRecommends(state, action) {
      state.recommends = action.payload;
      saveStorage({
        ...state,
        recommends: action.payload,
        isLoadedAvarta: false,
      });
    },
    hanldeChangeIsPlay(state, action) {
      state.isPlay = action.payload;
      saveStorage({
        ...state,
        isPlay: action.payload,
        isLoadedAvarta: false,
      });
    },
    hanldeChangeTimePlayed(state, action) {
      state.timePlayed = action.payload;
      saveStorage({
        ...state,
        timePlayed: action.payload,
        isLoadedAvarta: false,
      });
    },
    hanldeChangeVolume(state, action) {
      state.volume = action.payload;
      saveStorage({
        ...state,
        volume: action.payload,
        isLoadedAvarta: false,
      });
    },
    hanldeChangeisMute(state, action) {
      state.isMute = action.payload;
      saveStorage({
        ...state,
        isMute: action.payload,
        isLoadedAvarta: false,
      });
    },
  },
});
export const getData = (id) => (dispatch) => {
  axios
    .get(URL_GET_VIDEO + id)
    .then((data) => {
      if (
        data?.data?.data?.err === 0 &&
        data.data.data.data?.streaming?.mp4
      ) {
        dispatch(
          hanldeChangeVideoCurrent(data.data.data.data)
        );
        const mp4Source = data.data.data.data.streaming.mp4;
        dispatch(hanldeGetSources(mp4Source));
        dispatch(
          hanldeChangeRecommends(
            data.data.data.data.recommends
          )
        );
      }
    })

    .catch((err) => {
      console.log(
        err,
        'at call api URL_GET_VIDEO + id' +
          URL_GET_VIDEO +
          id
      );
    });
};

export const {
  hanldeChangeIsPlay,
  hanldeChangesrc,
  hanldeGetSources,
  hanldeGetData,
  hanldeChangeTimePlayed,
  hanldeChangeVolume,
  hanldeChangeisMute,
  hanldeChangeVideoCurrent,
  hanldeChangeRecommends,
} = video.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectVideo = (state) => state.video;

export default video.reducer;
