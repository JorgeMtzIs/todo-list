import React from 'react';

function TextInputWithLabel({ elementId, labelText, onChange, ref, value }) {
  return (
    <React.Fragment>
      <label htmlFor={elementId}>{labelText}</label>
      <input
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
