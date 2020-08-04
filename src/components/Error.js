import React from 'react';
import '../css/Error.css';

const Error = ({ error, errorRef }) => {
  return (
    <div ref={errorRef} className="error__notification">
      {error}
    </div>
  );
};

export default Error;
