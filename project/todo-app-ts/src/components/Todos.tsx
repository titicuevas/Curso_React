import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { type Todo as TodoType, ListOfTodos, type TodoId } from '../types';
import { Todo } from './Todo';

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: (id: TodoId) => void;
  onToggleCompletedTodo: (id: TodoId, completed: boolean) => void;
  onUpdateTitle: (params: { id: string, title: string }) => void;
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompletedTodo, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState<string>('');
  const [parent] = useAutoAnimate();

  return (
    <ul className='todo-list' ref={parent}>
      {todos.map(todo => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
        >
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompletedTodo={onToggleCompletedTodo}
            onUpdateTitle={onUpdateTitle}
            isEditing={isEditing === todo.id}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  );
};
