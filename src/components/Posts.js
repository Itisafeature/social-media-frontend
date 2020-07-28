import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import '../css/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await axios.get('/posts');
        setPosts(data.data.posts);
      } catch (err) {
        setPosts([]);
      }
    };
    getPosts();
  }, []);

  const handleNewPost = post => {
    setPosts(posts.concat(post));
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

export default Posts;
