import { fetchTodosFromApi } from '../shared/api';
import { Todo } from '../types/todo';

export const getTodos = (): Promise<Todo[]> => {
  console.log('fetching todos (react query)');
  return fetchTodosFromApi();
};
