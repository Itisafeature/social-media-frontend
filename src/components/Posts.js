import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Error from './Error';
import Post from './Post';
import PostForm from './PostForm';
import '../css/Posts.css';
import '../css/Error.css';

const Posts = ({ getPosts, user }) => {
  const [page, setPage] = useState(0);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [timeoutId, setTimeoutId] = useState('');
  const [posts, setPosts] = useState([]);

  const bottomBoundaryRef = useRef(null);
  const errorRef = useRef(null);

  const scrollObserver = useCallback(element => {
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          console.log(en);
          setPage(p => p + 1);
        }
      });
    }).observe(element);
  }, []);

  useEffect(() => {
    try {
      console.log(page);
      getPosts(page).then(data => setPosts(p => p.concat(data)));
    } catch (err) {
      setPosts([]);
    }
    return () => console.log('cleanup');
  }, [getPosts, page]); // I probably don't need this

  useEffect(() => {
    console.log(bottomBoundaryRef.current && posts.length > 0);
    if (bottomBoundaryRef.current && posts.length > 0) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

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
        <div
          style={{ border: '1px solid red' }}
          id="page-bottom-boundary"
          ref={bottomBoundaryRef}
        ></div>
      </div>
    </>
  );
};

export default Posts;
