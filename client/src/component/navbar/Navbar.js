import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import {AiOutlineUser, } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/authSlice'


const Navbar = () => {
  const {user} =useSelector((state)=> state.auth)
  const [isScrolled, setIsScrolled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className={`${"container"} ${isScrolled && "scrolled"}`}>
      <div className={"wrapper"}>
        <div className={"left"}>
          <Link to='/' className={"title"}>
            Travel Blogs
          </Link>
        </div>
        <div className={"center"}>
          <ul className={"list"}>
          <li className={"listItem"}>
              <Link to='/'>Home</Link>
            </li>
            <li className={"listItem"}>
              <Link to='/blog'>Blogs</Link>
            </li>
            <li className={"listItem"}>
              {user ?<Link to='/create'>Create</Link> : <Link to='/login'>Create</Link> }
            </li>
          </ul>
        </div>
        <div className={"right"}>
          {user ?<button onClick={handleLogout} className={"logout"}>Logout</button> :<Link to='/login' className={"cartContainer"}>
          <AiOutlineUser className={"userIcon"}/>
          </Link>  }
          
          
        </div>
      </div>
    </div>
  )
}

export default Navbar