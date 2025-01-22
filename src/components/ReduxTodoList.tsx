import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteTodo, fetchTodos } from '../store/features/todoSlice';

const ReduxTodoList = () => {
  const dispatch = useAppDispatch();
  const { items: todos, loading, error } = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }

  const handleDelete = async (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">할 일 목록</h1>
        <button
          onClick={() => dispatch(fetchTodos())}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          할 일 목록 갱신
        </button>
      </div>
      <ul className="space-y-2">
        {todos?.map((todo) => (
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

export default ReduxTodoList;
