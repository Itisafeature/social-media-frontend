import React from 'react';
import Comment from './Comment';

const Comments = ({ comments }) => {
  return (
    <ul>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </ul>
  );
};

export default Comments;
