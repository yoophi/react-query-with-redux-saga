import { ReactQueryTodoAdd } from './components/ReactQueryTodoAdd';
import ReactQueryTodoList from './components/ReactQueryTodoList';
import { ReduxTodoAdd } from './components/ReduxTodoAdd';
import ReduxTodoList from './components/ReduxTodoList';

function App() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <ReduxTodoAdd />
        <ReduxTodoList />
      </div>
      <div>
        <ReactQueryTodoAdd />
        <ReactQueryTodoList />
      </div>
    </div>
  );
}

export default App;
