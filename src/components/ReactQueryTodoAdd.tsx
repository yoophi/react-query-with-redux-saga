import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export const ReactQueryTodoAdd = () => {
  const [title, setTitle] = React.useState('');
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newTodo: { title: string }) => {
      return axios.post('http://localhost:3000/todos', newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">새로운 할 일 추가 (react-query)</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 p-2 border rounded"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '추가 중...' : '추가'}
        </button>
      </form>
    </div>
  )
}
