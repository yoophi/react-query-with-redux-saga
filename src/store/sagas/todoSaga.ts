import { call, put, takeLatest } from 'redux-saga/effects';
import { getTodos, addTodo, deleteTodo } from '../api/todoApi';
import { setError, setLoading, setTodos, FETCH_TODOS, ADD_TODO, DELETE_TODO, fetchTodos } from '../features/todoSlice';
import { Todo } from '../../types/todo';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchTodosSaga() {
  try {
    yield put(setLoading(true));
    const todos: Todo[] = yield call(getTodos);
    yield put(setTodos(todos));
    yield put(setError(null));
  } catch (error) {
    yield put(setError(error instanceof Error ? error.message : '할 일 목록을 불러오는데 실패했습니다.'));
  } finally {
    yield put(setLoading(false));
  }
}

function* addTodoSaga(action: PayloadAction<{ title: string }>) {
  try {
    yield put(setLoading(true));
    const newTodo: Todo = {
      id: Date.now(),
      title: action.payload.title,
      userId: 1,
      completed: false
    };
    yield call(addTodo, newTodo);
    const todos: Todo[] = yield call(getTodos);
    yield put(setTodos(todos));
    yield put(setError(null));
  } catch (error) {
    yield put(setError(error instanceof Error ? error.message : '할 일을 추가하는데 실패했습니다.'));
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteTodoSaga(action: PayloadAction<number>) {
  yield call(deleteTodo, action.payload);
  try {
    yield put(setLoading(true));
    yield call(fetchTodosSaga);
    yield put(setError(null));
  } catch (error) {
    yield put(setError(error instanceof Error ? error.message : '할 일 목록을 갱신하는데 실패했습니다.'));
  } finally {
    yield put(setLoading(false));
  }
}

export function* todoSaga() {
  yield takeLatest(FETCH_TODOS, fetchTodosSaga);
  yield takeLatest(ADD_TODO, addTodoSaga);
  yield takeLatest(DELETE_TODO, deleteTodoSaga);
} 