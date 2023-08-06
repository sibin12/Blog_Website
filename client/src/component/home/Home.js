import React, { useEffect, useState } from 'react'
import Hero from '../hero/Hero'
import { useSelector } from 'react-redux';
import './Home.css'

const Home = () => {
    const { token } = useSelector((state) => state.auth);
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
  return (
    <div>
     <Hero />
    

    </div>
  )
}

export default Home
