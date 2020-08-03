import React from 'react';
import Comment from './Comment';

const Comments = ({ comments, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (comments.length > 0) {
    return (
      <ul>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </ul>
    );
  } else {
    return <div>No one has commented yet!</div>;
  }
};

export default Comments;
