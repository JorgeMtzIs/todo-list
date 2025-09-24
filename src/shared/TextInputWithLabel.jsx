import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  padding-right: 5px;
`;

const StyledInput = styled.input`
  margin-right: 3px;
`;

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <React.Fragment>
      <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </React.Fragment>
  );
}

export default TextInputWithLabel;
