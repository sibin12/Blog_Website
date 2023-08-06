import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './Blog.css'
import { Link } from 'react-router-dom';
import { AiFillEdit ,AiFillDelete } from 'react-icons/ai';

const Blog = () => {
    // const { token  } = useSelector((state) => state.auth);
    const [error, setError] = useState(null);
    const { token, user } = useSelector((state) => ({
        token: state.auth.token,
        user: state.auth.user,
      }));
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      // Fetch blogs from the backend API
      const fetchBlogs = async () => {
        try {
          const response = await fetch('http://localhost:5000/blog', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
          setBlogs(data);
        } catch (error) {
          console.error(error.message);
        }
      };
  
      fetchBlogs();
    }, [token]);

    const handleDeleteBlog = async (blogId) => {
        try {
            console.log(user,"userdetails");
            console.log(blogId,"blogggiddd");
          await fetch(`http://localhost:5000/blog/${blogId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId: user._id }),
          });
    

          // Remove the deleted blog from the blogs state
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        } catch (error) {
          console.error(error.message);
          setError('An error occurred while deleting the blog');

        }
      };
      
  return (
      <>
      {error && window.alert(`${error}`)}
          {/* {error && <p>{error}</p>} */}

    <div className="home-container">
      
    <div className="blog-container">
      {blogs.map((blog) => (
        
          <div key={blog?._id} className="blog-card">
             <Link to={`/updateBlog/${blog?._id}`}>
                  <AiFillEdit />
                </Link>
                <button onClick={() => handleDeleteBlog(blog?._id)}>
                <AiFillDelete />
              </button>
              
          <h2>{blog?.title}</h2>
          <p>{blog?.desc}</p>
          <img src={`http://localhost:5000/image/${blog?.img}`}  alt={blog?.title} />
         
        </div>
      ))}
    </div>
    
  </div>
      </>
  )
}

export default Blog
