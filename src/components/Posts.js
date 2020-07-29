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

  return (
    <>
      <PostForm handleNewPost={handleNewPost} />
      <div className="post__container">
        {posts.map(el => (
          <Post key={el._id} post={el} />
        ))}
      </div>
    </>
  );
};

export default withRouter(Posts);
