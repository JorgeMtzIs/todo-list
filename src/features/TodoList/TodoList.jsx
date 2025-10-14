import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import { useSearchParams, useNavigate } from 'react-router';
import { useEffect } from 'react';

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  function handlePreviousPage() {
    if (!(currentPage - 1 < 1)) {
      setSearchParams({ page: currentPage - 1, per_page: itemsPerPage });
    }
  }

  function handleNextPage() {
    if (!(currentPage + 1 > totalPages)) {
      setSearchParams({ page: currentPage + 1, per_page: itemsPerPage });
    }
  }

  useEffect(() => {
    if (
      typeof currentPage !== 'number' ||
      currentPage < 1 ||
      currentPage > totalPages
    ) {
      navigate('/');
    }
  }, [currentPage, totalPages, navigate]);

  return filteredTodoList.length === 0 ? (
    <>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <p>Add todo above to get started</p>
      )}
    </>
  ) : (
    <>
      <ul className={styles.todoList}>
        {filteredTodoList
          .slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)
          .map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
      </ul>
      <div className={styles.paginationControls}>
        <button
          type="button"
          onClick={() => handlePreviousPage()}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => handleNextPage()}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TodoList;
