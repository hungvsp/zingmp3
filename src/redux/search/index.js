import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL_GET_HOTKEYS } from '../../constants/urlApi';
const initalData = {
  isCollapse: false,
  hotKey: [],
};
export const search = createSlice({
  name: 'search',
  initialState: initalData,
  reducers: {
    hanldeChangeIsCollapse(state, action) {
      state.isCollapse = action.payload;
    },
    hanldeChangeHotKey(state, action) {
      state.hotKey = action.payload;
    },
  },
});
export const getHotKey = () => (dispatch) => {
  axios
    .get(URL_GET_HOTKEYS)
    .then((data) => {
      if (data.data.err === 0) {
        const result = data.data.data;
        dispatch(hanldeChangeHotKey(result));
      }
    })
    .catch((err) => {
      console.log(err, 'at call api get hot key ');
    });
};
export const {
  hanldeChangeIsCollapse,
  hanldeChangeHotKey,
} = search.actions;

export const selectSearch = (state) => state.search;

export default search.reducer;
