import React from 'react';
import '../css/NotFound.css';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  const sendBack = () => {
    history.goBack();
  };

  console.log('here');

  return (
    <div className="not-found--container">
      <h1 className="not-found--h1">Unable to Locate this Page!</h1>
      <button className="go-back-btn" onClick={sendBack}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
