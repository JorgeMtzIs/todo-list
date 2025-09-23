import './App.css';
import styles from './App.module.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import { use, useEffect, useState, useCallback, useReducer } from 'react';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const encodeUrl = useCallback(() => {
    let searchQuery = '';
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    if (queryString !== '') {
      searchQuery = `&filterByFormula=SEARCH("${queryString}", +title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [queryString, sortDirection, sortField]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = { method: 'GET', headers: { Authorization: token } };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw Error(resp.status);
        }
        const response = await resp.json();
        dispatch({ type: todoActions.loadTodos, records: response.records });
      } catch (error) {
        console.log(error.message);
        error.message = `${error.message}. Unable to fetch todos.`;
        dispatch({ type: todoActions.setLoadError, error: error });
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  const addTodo = async (title) => {
    const payload = {
      records: [
        {
          fields: {
            title: title,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw Error(resp.status);
      }
      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records: records });
    } catch (error) {
      console.log(error.message);
      error.message = `${error.message}. Unable to add Todo.`;
      dispatch({ type: todoActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      dispatch({ type: todoActions.completeTodo, id: id });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw Error(resp.status);
      }
    } catch (error) {
      console.log(error.message);
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo });
      error.message = `${error.message}. Reverting completion.`;
      dispatch({ type: todoActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    try {
      dispatch({ type: todoActions.updateTodo, editedTodo: editedTodo });
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw Error(resp.status);
      }
    } catch (error) {
      console.log(error.message);
      //setErrorMessage(`${error.message}. Reverting todo...`);
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo });
      error.message = `${error.message}. Reverting todo...`;
      dispatch({ type: todoActions.setLoadError, error: error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  return (
    <div className={styles.app}>
      <h1>My Todos</h1>
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
      {todoState.errorMessage && (
        <div className={styles.error}>
          <hr></hr>
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
