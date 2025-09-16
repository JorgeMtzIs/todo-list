import { useRef } from 'react';
import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    todoTitleInput.current.focus();
    setWorkingTodoTitle('');
  }

  const StyledButton = styled.button`
    font-style: ${isSaving ? 'italic' : 'normal'};
  `;

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />
      <StyledButton disabled={!workingTodoTitle.trim() === ''}>
        {isSaving ? 'Saving' : 'Add Todo'}
      </StyledButton>
    </form>
  );
}

export default TodoForm;
