import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useField } from '../hooks/fields';
import '../css/Post.css';

const Post = ({ post, handleEditPost, handleDeletePost }) => {
  const [showForm, setShowForm] = useState(false);
  const content = useField('text');
  const { user } = useContext(UserContext);

  return (
    <div className="post">
      <p className="post__content">{post.content}</p>
      <p className="post__likes">{post.likes}</p>
      <h3 className="post__author">{post.user.username}</h3>
      {post.user.username === user.username && (
        <>
          <button onClick={() => setShowForm(!showForm)}>Edit Post</button>
          <button onClick={() => handleDeletePost(post)}>Delete Post</button>
        </>
      )}

      {showForm && (
        <form
          onSubmit={event => handleEditPost(event, post, content, setShowForm)}
        >
          <textarea
            className="content"
            value={post.content}
            rows="6"
            cols="30"
            {...content}
          ></textarea>
          <button type="submit">Update Post</button>
        </form>
      )}
    </div>
  );
};

export default Post;
