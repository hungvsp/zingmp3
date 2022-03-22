import { createSlice } from '@reduxjs/toolkit'
const initalTodo = {
   inputJob:''
}

export const zSlice = createSlice({
  name: 'zSlice',
  initialState:initalTodo,
  reducers: {
    editJob(state,action){
        state.todos[action.payload] = state.inputJob
    }
  },
})

export const { editIsDone} = zSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTodo = (state) => state.todos

export default zSlice.reducer