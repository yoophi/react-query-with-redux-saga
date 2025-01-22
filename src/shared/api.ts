import axios from 'axios';
import { Todo } from '../types/todo';

const BASE_URL = 'http://localhost:3000';

export const fetchTodosFromApi = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${BASE_URL}/todos`);
  return response.data;
}; 