import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import '../css/Posts.css';

const Posts = ({ history }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data.posts);
      } catch (err) {
        setPosts([]);
      }
    };
    getPosts();
  }, []);

  const handleNewPost = post => {
    setPosts([post].concat(posts));
  };

  const handleEditPost = async (event, post, content, setShowForm) => {
    event.preventDefault();
    try {
      const res = await axios.patch(`/posts/${post._id}`, {
        content: content.value,
      });
      const editedPost = res.data.post;
      setPosts(
        posts
          .map(post => (editedPost._id === post._id ? editedPost : post))
          .sort((a, b) => new Date(a.updatedAt) > new Date(b.updatedAt))
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
      <PostForm handleNewPost={handleNewPost} />
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

export default withRouter(Posts);
