import { useState, useEffect, useRef } from 'react';
import { type Todo as TodoType, type TodoId } from '../types';

interface Props extends TodoType {
  onRemoveTodo: (id: TodoId) => void;
  onToggleCompletedTodo: (id: TodoId, completed: boolean) => void;
  onUpdateTitle: (params: { id: string, title: string }) => void;
  isEditing: boolean;
  setIsEditing: (id: string | null) => void;
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompletedTodo, onUpdateTitle, isEditing, setIsEditing }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim());
      if (editedTitle !== title) {
        onUpdateTitle({ id, title: editedTitle });
      }
      if (editedTitle === '') {
        onRemoveTodo({ id });
      }
      setIsEditing('');
    }
    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing('');
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputEditTitle.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="view">
      <input 
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={(event) => onToggleCompletedTodo({ id }, event.target.checked)} 
      />
      {isEditing ? (
        <input
          ref={inputEditTitle}
          className="edit"
          value={editedTitle}
          onChange={(e) => { setEditedTitle(e.target.value) }}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing('')}
        />
      ) : (
        <label onDoubleClick={() => setIsEditing(id)}>{title}</label>
      )}
      <button
        className="destroy"
        onClick={() => onRemoveTodo({ id })}
      />
    </div>
  );
};
