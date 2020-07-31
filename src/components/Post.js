import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useField } from '../hooks/fields';
import Comments from './Comments';
import '../css/Post.css';

const Post = ({ post, handleEditPost, handleDeletePost }) => {
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const content = useField('text');
  const commentContent = useField('text');
  const { user } = useContext(UserContext);

  const handleNewComment = async event => {
    event.preventDefault();
    try {
      const res = await axios.post(`/posts/${post._id}/comments`, {
        content: commentContent.value,
      });
      if (comments.length > 0) {
        setComments([res.data.comment].concat(comments));
        commentContent.onReset();
      } else {
        setComments(res.data.comment);
      }
    } catch (err) {
      // TODO: HANDLE ERROR
      console.log(err);
    }
  };

  const loadComments = async () => {
    if (comments.length === 0) {
      try {
        const res = await axios.get(`/posts/${post._id}/comments`);
        setComments(res.data.comments);
      } catch (err) {
        // TODO: HANDLE ERROR
      }
    }
  };

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
      <button
        onClick={() => {
          setShowComments(!showComments);
          loadComments();
        }}
      >
        Comments
      </button>
      {showComments && (
        <>
          <form onSubmit={handleNewComment}>
            <textarea
              className="content"
              rows="6"
              cols="30"
              {...commentContent}
            ></textarea>
            <button type="submit">Leave Comment</button>
          </form>
          <Comments comments={comments} />
        </>
      )}
    </div>
  );
};

export default Post;
