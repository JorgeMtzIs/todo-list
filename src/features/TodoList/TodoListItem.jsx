import React, { useEffect } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import styles from './TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    if (!isEditing) {
      return;
    }
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  return (
    <li className={styles.todoListItem}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <React.Fragment>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <label>
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
              <span onClick={() => setIsEditing(true)}>{todo.title}</span>
            </label>
          </React.Fragment>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
