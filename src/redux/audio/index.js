import { createSlice } from '@reduxjs/toolkit';
const initalDataStr = localStorage.getItem('audio');
const initalData = initalDataStr
  ? JSON.parse(initalDataStr)
  : {
      timePlayed: 0,
      volume: 1,
      isMute: false,
    };
const saveStorage = (state) => {
  const stateStr = JSON.stringify(state);
  localStorage.setItem('audio', stateStr);
};
export const audio = createSlice({
  name: 'audio',
  initialState: initalData,
  reducers: {
    hanldeChangeTimePlayed(state, action) {
      state.timePlayed = action.payload;
      saveStorage({ ...state, timePlayed: action.payload });
    },
    hanldeChangeVolume(state, action) {
      state.volume = action.payload;
      saveStorage({ ...state, volume: action.payload });
    },
    hanldeChangeisMute(state, action) {
      state.isMute = action.payload;
      saveStorage({ ...state, isMute: action.payload });
    },
  },
});

export const {
  hanldeChangeTimePlayed,
  hanldeChangeVolume,
  hanldeChangeisMute,
} = audio.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAudio = (state) => state.audio;

export default audio.reducer;
