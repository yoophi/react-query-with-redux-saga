import axios from 'axios';
import { queryClient } from '../../queryClient';
import { fetchTodosFromApi } from '../../shared/api';
import { Todo } from '../../types/todo';

const BASE_URL = 'http://localhost:3000';

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await queryClient.fetchQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      console.log('fetching todos (redux)');
      return await fetchTodosFromApi();
    },
  });

  return todos;
};

export const addTodo = async (todo: Todo) => {
  await axios.post(`${BASE_URL}/todos`, todo);
  queryClient.invalidateQueries({ queryKey: ['todos'] });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${BASE_URL}/todos/${id}`);
  queryClient.invalidateQueries({ queryKey: ['todos'] });
};