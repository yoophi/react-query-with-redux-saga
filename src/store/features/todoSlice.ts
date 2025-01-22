import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo';

// TodoState 인터페이스를 export 해줍니다
export interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

// Action Types 추가
export const FETCH_TODOS = 'todos/FETCH_TODOS' as const;
export const ADD_TODO = 'todos/ADD_TODO' as const;
export const DELETE_TODO = 'todos/DELETE_TODO' as const;
// Action Creators 추가
export const fetchTodos = () => ({
  type: FETCH_TODOS,
});

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  payload: id,
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTodos, setLoading, setError } = todoSlice.actions;
export default todoSlice.reducer; 