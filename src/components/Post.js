import React from 'react';
import '../css/Post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <p className="post__content">{post.content}</p>
      <p className="post__likes">{post.likes}</p>
      <h3 className="post__author">{post.user.username}</h3>
    </div>
  );
};

export default Post;
