import { useState } from 'react';
import { Todos } from './components/Todos';
import { FilterValue, type TodoId, type Todo as TodoType } from './types';
import { TODO_FILTERS } from './consts';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const mockTodos: TodoType[] = [
  { id: "1", title: "Georgia", completed: true },
  { id: "2", title: "Alemania", completed: true },
  { id: "3", title: "Francia", completed: true },
  { id: "4", title: "Campeones", completed: false },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoType[]>(mockTodos);
  const [filterSelect, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);
  
  const handleRemove = (id: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = (id: Pick<TodoType, 'id'>, completed: boolean): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id.id) {
        return { ...todo, completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = ({ title }: { title: string }): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const filteredTodos = todos.filter(todo => {
    if (filterSelect === TODO_FILTERS.ACTIVE) {
      return !todo.completed;
    }
    if (filterSelect === TODO_FILTERS.COMPLETED) {
      return todo.completed;
    }
    return true;
  });

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos 
        onRemoveTodo={handleRemove}
        onToggleCompletedTodo={handleCompleted}
        onUpdateTitle={handleUpdateTitle}
        todos={filteredTodos}
      />  
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelect}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
