import React from 'react';
import Comment from './Comment';
import '../css/Comments.css';

const Comments = ({ comments, isLoading, loadComments }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (comments.length > 0) {
    return (
      <>
        <ul className="comments--ul">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </ul>
        <button
          onClick={event => loadComments(event)}
          className="more--comments"
        >
          View More Comments
        </button>
      </>
    );
  } else {
    return <div>No one has commented yet!</div>;
  }
};

export default Comments;
