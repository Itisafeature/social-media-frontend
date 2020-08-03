import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Error from './Error';
import Post from './Post';
import PostForm from './PostForm';
import '../css/Posts.css';

const Posts = ({ getPosts }) => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      getPosts().then(data => setPosts(data));
    } catch (err) {
      setPosts([]);
    }
  }, [getPosts]);

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
      console.log(editedPost.updatedAt);
      setPosts(posts =>
        posts
          .map(post => (editedPost._id === post._id ? editedPost : post))
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      );
      content.onReset();
      setShowForm(false);
    } catch (err) {
      // TODO: Handle Error
      console.log(err);
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
      {isError && <Error error={error} />}
      <PostForm
        handleNewPost={handleNewPost}
        setError={setError}
        setIsError={setIsError}
      />
      <div className="post__container">
        {posts.map(el => (
          <Post
            key={el._id}
            post={el}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
          />
        ))}
      </div>
    </>
  );
};

export default Posts;
