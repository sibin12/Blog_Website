import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Signup from './component/signup/Signup'
import Create from './component/create/Create'
import Blog from './component/blog/Blog';
import Update from './component/updateblog/updateBlog'

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/create' element={ <Create />} />
        <Route path='/blog' element={ <Blog />} />
        <Route path='/updateBlog/:id' element= { <Update />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
