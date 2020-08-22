import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Error from './Error';
import Post from './Post';
import PostForm from './PostForm';
import '../css/Posts.css';
import '../css/Error.css';

const Posts = ({ getPosts, user }) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [posts, setPosts] = useState([]);

  const errorRef = useRef(null);

  useEffect(() => {
    try {
      getPosts().then(data => setPosts(data));
    } catch (err) {
      console.log(err);
      setPosts([]);
    }

    return () => console.log('cleanup');
  }, [getPosts]); // I probably don't need this

  const handleNewPost = post => {
    setPosts(posts => [post].concat(posts));
  };

  const handleEditPost = async (event, post, content, setShowForm) => {
    event.preventDefault();
    try {
      const res = await axios.patch(`/posts/${post._id}`, {
        content: content.value,
      });
      const editedPost = res.data.post;
      setPosts(posts => [
        editedPost,
        ...posts.filter(post => post._id !== editedPost._id),
      ]);
      content.onReset();
      setShowForm(false);
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

  const handleDeletePost = async post => {
    if (window.confirm('Delete Post?')) {
      try {
        await axios.delete(`/posts/${post._id}`);
        setPosts(posts.filter(el => el._id !== post._id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isError && <Error errorRef={errorRef} error={error} />}
      <PostForm
        handleNewPost={handleNewPost}
        setError={setError}
        setIsError={setIsError}
        setTimeoutId={setTimeoutId}
        timeoutId={timeoutId}
        errorRef={errorRef}
      />
      <div className="post__container">
        {posts.map(el => (
          <Post
            key={el._id}
            user={user}
            post={el}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
            handleNewPost={handleNewPost}
            setError={setError}
            setIsError={setIsError}
            setTimeoutId={setTimeoutId}
            timeoutId={timeoutId}
            errorRef={errorRef}
          />
        ))}
      </div>
    </>
  );
};

export default Posts;
