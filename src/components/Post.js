import React, { useState } from 'react';
import axios from 'axios';
import { useField } from '../hooks/fields';
import Comments from './Comments';
import '../css/Post.css';

const Post = ({
  post,
  user,
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
  const [commentsNum, setCommentsNum] = useState(0);
  const [loadingComments, setLoadingComments] = useState(false);
  const content = useField('text');
  const commentContent = useField('text');

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

  const loadComments = async event => {
    event.persist();
    if (comments.length === 0) {
      setLoadingComments(true);
    }

    if (
      !event.target.className.includes('post-btn__comments') ||
      comments.length === 0
    ) {
      try {
        const res = await axios.get(
          `/posts/${post._id}/comments/${commentsNum}`
        );
        setComments(comments.concat(res.data.comments));
        setCommentsNum(commentsNum + 5);
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

  console.log(post.user);
  return (
    <div className="post">
      <div className="post--header">
        <img className="avatar-image" src={post.user.image} alt="person" />
        <h3 className="post__author">{post.user.username}</h3>
      </div>
      <p className="post__content">{post.content}</p>
      <div className="post--btns">
        {post.user.username === user.username && (
          <>
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
          </>
        )}
        <button
          className="btn post-btn__comments"
          onClick={event => {
            setShowComments(!showComments);
            loadComments(event);
          }}
        >
          Comments
        </button>
      </div>

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
            <button className="btn post-comment--btn" type="submit">
              Leave Comment
            </button>
          </form>
          <div className="comments">
            <Comments
              loadComments={loadComments}
              comments={comments}
              isLoading={loadingComments}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
