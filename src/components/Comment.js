import React from 'react';
import '../css/Comment.css';

const Comment = ({ comment }) => {
  return <li className="comment--content">{comment.content}</li>;
};

export default Comment;
