import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useField } from '../hooks/fields';
import Comments from './Comments';
import '../css/Post.css';

const Post = ({
  post,
  handleEditPost,
  handleDeletePost,
  setIsError,
  setError,
  setTimeoutId,
  timeoutId,
  errorRef,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
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
        setComments([res.data.comment]);
        commentContent.onReset();
      }
    } catch (err) {
      setIsError(true);
      setError(err.response.data.msg);
      window.clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          setIsError(false);
          setError('');
        }, 5000)
      );
      window.scrollTo(0, errorRef.current.offsetTop);
    }
  };

  const loadComments = async () => {
    if (comments.length === 0) {
      setLoadingComments(true);
      try {
        const res = await axios.get(`/posts/${post._id}/comments`);
        setComments(res.data.comments);
        setLoadingComments(false);
      } catch (err) {
        setIsError(true);
        setError('Something Went Wrong. Please Try Again');
        window.clearTimeout(timeoutId);
        setTimeoutId(
          setTimeout(() => {
            setIsError(false);
            setError('');
          }, 5000)
        );
        window.scrollTo(0, errorRef.current.offsetTop);
      }
    }
  };

  return (
    <div className="post">
      <div className="post--header">
        <img
          className="avatar-image"
          src="sergio-de-paula-c_GmwfHBDzk-unsplash.jpg"
          alt="person"
        />
        <h3 className="post__author">{post.user.username}</h3>
      </div>
      <p className="post__content">{post.content}</p>
      {post.user.username === user.username && (
        <div className="post--btns">
          <button
            className="btn post-btn__edit"
            onClick={() => setShowForm(!showForm)}
          >
            Edit Post
          </button>
          <button
            className="btn post-btn__delete"
            onClick={() => handleDeletePost(post)}
          >
            Delete Post
          </button>
          <button
            className="btn post-btn__comments"
            onClick={() => {
              setShowComments(!showComments);
              loadComments();
            }}
          >
            Comments
          </button>
        </div>
      )}

      {showForm && (
        <form
          className="post-form__edit"
          onSubmit={event => handleEditPost(event, post, content, setShowForm)}
        >
          <textarea
            className="content"
            rows="6"
            cols="30"
            {...content}
            minLength="10"
          ></textarea>
          <button className="btn post-btn__update" type="submit">
            Update Post
          </button>
        </form>
      )}

      {showComments && (
        <>
          <form className="comment-form" onSubmit={handleNewComment}>
            <textarea
              className="content"
              rows="6"
              cols="30"
              {...commentContent}
            ></textarea>
            <button className="btn" type="submit">
              Leave Comment
            </button>
          </form>
          <Comments comments={comments} isLoading={loadingComments} />
        </>
      )}
    </div>
  );
};

export default Post;
