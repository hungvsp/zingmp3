import { createSlice } from '@reduxjs/toolkit';
const initalData = {
  isShowModal: false,
};
export const modal = createSlice({
  name: 'modal',
  initialState: initalData,
  reducers: {
    haddleIsShowModal(state, action) {
      state.isShowModal = action.payload;
    },
  },
});

export const { haddleIsShowModal } = modal.actions;

export const selectModal = (state) => state.modal;

export default modal.reducer;
