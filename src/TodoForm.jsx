import { useRef } from 'react';
import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    todoTitleInput.current.focus();
    setWorkingTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="todoTitle"
        name="title"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      ></input>
      <button disabled={!workingTodoTitle}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
