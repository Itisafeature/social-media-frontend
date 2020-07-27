import React from 'react';
import { useField } from '../hooks/fields';
import '../css/PostForm.css';

const PostForm = () => {
  const content = useField('textarea');

  return (
    <>
      <h3 className="post-form__header">Add New Post</h3>
      <form className="post-form">
        <input {...content} />
      </form>
    </>
  );
};

export default PostForm;
