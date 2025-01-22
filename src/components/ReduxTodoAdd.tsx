import React from 'react'
import { useAppDispatch } from '../hooks/redux';

export const ReduxTodoAdd = () => {
  const [title, setTitle] = React.useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'todos/ADD_TODO', payload: { title } });
    setTitle('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">새로운 할 일 추가 (redux-saga)</h2>
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
        >
          추가
        </button>
      </form>
    </div>
  )
}
