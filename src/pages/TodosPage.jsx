import React from 'react';
import styles from '../App.module.css';
import TodoList from '../features/TodoList/TodoList';
import TodoForm from '../features/TodoForm';
import TodosViewForm from '../features/TodosViewForm';
function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updateTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <React.Fragment>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />
      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />
      <hr className={styles.hr} />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </React.Fragment>
  );
}

export default TodosPage;
