import { RootState, store } from '../../app/store';
import { addTodo, checkTodo, fetchTodos } from './todoAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppDispatch } from './../../app/store';
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

export interface TodoCheck{
  id: number,
  isDone: boolean
}


const initialState: TodoState = {
  todoItems: [],
  status: TodoItemsStatus.Idle,
  filterState: TodoItemsFilterState.All
};

export const fetchTodoAsync = createAsyncThunk(
  'todo/fetchTodos',
  async () => {
    const response = await fetchTodos();
    return response;
  }
);

export const checkTodoAsync = createAsyncThunk(
  'todo/checkTodo',
  async (request:TodoCheck) => {
    const response = await checkTodo(request.id, request.isDone);
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
      .addCase(addTodoAsync.pending, (state) => {
        state.status = TodoItemsStatus.Loading;
      })
      .addCase(addTodoAsync.fulfilled, (state,action) => {
        state.status = TodoItemsStatus.Idle;
        state.todoItems = [...state.todoItems, action.payload]
      })
      .addCase(checkTodoAsync.pending, (state) => {
        state.status = TodoItemsStatus.Loading;
      })
      .addCase(checkTodoAsync.fulfilled, (state,action) => {
        state.status = TodoItemsStatus.Idle;
        let item = state.todoItems.find(n=>n.id === action.payload.id)
        console.log(item)
      })
  },
});

export default todoSlice.reducer;
