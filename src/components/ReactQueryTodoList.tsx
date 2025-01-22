import { useMutation, useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/todoApi';
import axios from 'axios';
import { queryClient } from '../queryClient';

const ReactQueryTodoList = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 에러'}</div>;
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">할 일 목록 (React Query)</h1>
      <ul className="space-y-2">
        {todos && todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center">
              <input type="checkbox" checked={todo.completed} readOnly className="mr-3" />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
            </div>
            <button onClick={() => handleDelete(todo.id)} className="px-3 py-1 text-sm text-red-600 hover:text-red-800">
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactQueryTodoList;
