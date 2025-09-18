import { useState } from 'react';
import { useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  function preventRefresh(event) {
    event.preventDefault();
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  const StyledSelect = styled.select`
    margin-left: 5px;
    margin-right: 5px;
  `;
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <TextInputWithLabel
          labelText="Search Todos:"
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
          value={localQueryString}
        />
        <button
          type="button"
          onClick={() => {
            setLocalQueryString('');
          }}
        >
          Clear
        </button>
      </div>
      <div>
        <label>Sort by</label>
        <StyledSelect
          onChange={(e) => {
            setSortField(e.target.value);
          }}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>
        <label>Direction</label>
        <StyledSelect
          onChange={(e) => {
            setSortDirection(e.target.value);
          }}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </div>
    </form>
  );
}

export default TodosViewForm;
