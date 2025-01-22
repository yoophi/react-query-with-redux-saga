import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './features/todoSlice';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 