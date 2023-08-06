import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import   './update.module.css'
import { useSelector } from 'react-redux';

const EditBlog = () => {
    const { token, user } = useSelector((state) => ({
        token: state.auth.token,
        user: state.auth.user,
      }));  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    // Fetch the blog data from the server using the blog ID
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blog/find/${id}`);
        const data = await response.json();
        console.log(data,"updating data by fetch");
        setTitle(data.title);
        setDesc(data.desc);
        setCurrentImage(data.img);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    // Set the selected image file
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    //   const formData = new FormData();
    //   formData.append('title', title);
    //   formData.append('desc', desc);
    //   formData.append('image', image);

    
  const updatedBlogData = {
    title: title,
    desc: desc,
    image: image,
  };
      // Update the blog data on the server
      const response = await fetch(`http://localhost:5000/blog/updateBlog/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        method: 'PUT',
        body: JSON.stringify(updatedBlogData),
      });
       console.log(response);
      if (response.ok) {
        navigate(`/blog`);
      } else {
        console.error('Failed to update blog');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div >
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Current Image:</label>
          {currentImage && <img className={"EditImage"} src={`http://localhost:5000/image/${currentImage}`} alt="Current Blog Image" />}
        </div>
        <div>
          <label>New Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditBlog;
