import React from 'react';
import axios from 'axios';
import { useField } from '../hooks/fields';
import '../css/PostForm.css';

const PostForm = ({ handleNewPost, setError, setIsError }) => {
  const content = useField('text');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await axios.post('/posts', { content: content.value });
      handleNewPost(res.data.post);
      content.onReset();
    } catch (err) {
      setIsError(true);
      setError(err.response.data.msg);
      setTimeout(() => {
        setIsError(false);
        setError('');
      }, 5000);
      console.log(err);
    }
  };

  return (
    <>
      <div className="post-div">
        <h3 className="post-form__header">Add New Post</h3>
        <form className="post-form">
          <textarea
            className="content"
            placeholder="Post Content"
            rows="6"
            cols="30"
            {...content}
          />
          <button
            onClick={handleSubmit}
            className="post-form-btn"
            type="submit"
          >
            Add Post
          </button>
        </form>
      </div>
    </>
  );
};

export default PostForm;
