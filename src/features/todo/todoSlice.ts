import { AppThunk, RootState } from '../../app/store';
import { addTodo, fetchTodos } from './todoAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ITodoItem } from './models';

export enum TodoItemsFilterState{
    All = 'all',
    Active = 'active',
    Completed = 'completed'
}

export enum TodoItemsStatus{
    Idle = 'idle',
    Loading = 'loading'
}

export interface TodoState {
    todoItems: Array<ITodoItem>;
    filterState: TodoItemsFilterState,
    status: TodoItemsStatus;
}

const initialState: TodoState = {
  todoItems: [],
  status: TodoItemsStatus.Loading,
  filterState: TodoItemsFilterState.All
};

export const fetchTodoAsync = createAsyncThunk(
  'todo/fetchTodos',
  async () => {
        console.log('sss');

    const response = await fetchTodos();
    return response;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todo/addTodo',
  async (text:string) => {
    const response = await addTodo(text);
    return response;
  }
);

export const selectTodoItems = (state: RootState) => state.todo.todoItems;

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoAsync.pending, (state) => {
        state.status = TodoItemsStatus.Loading;
      })
      .addCase(fetchTodoAsync.fulfilled, (state, action) => {
        state.status = TodoItemsStatus.Idle;
        state.todoItems = action.payload;
      })
  },
});

export default todoSlice.reducer;
