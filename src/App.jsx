import { useState,useEffect } from 'react'
import Food from './component/food';
import Carousel from './component/Imgscroller'
import Login from './component/Login';
import Navbar from './component/Navbar'
import { Routes, Route, useSearchParams} from 'react-router-dom';
import Signup from './component/Signup';
import Mycart from './component/mycart';
import { countercontext } from './context/context'
import Profile from './component/profile';
function App() {
  const [user, setuser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null; // Parse JSON or set to null
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Store user as string
    } else {
      localStorage.removeItem('user'); // Clear from localStorage if user is null
    }
  }, [user]);

  const imgs=[
    "https://cdn.sanity.io/images/y936aps5/production/193c1132e5754f19edceafd222e5d3ab291a50b4-800x362.webp?auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&w=800&h=362&rect=0,0,800,362",
    "https://cdn.sanity.io/images/y936aps5/production/99b06812e395433620895a11c727121157daa45f-800x362.webp?auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&w=800&h=362&rect=0,0,800,362",
    "https://thumbs.dreamstime.com/b/wooden-table-food-top-view-cafe-102532611.jpg"
  ];

  return (
    <>
    <countercontext.Provider value={{user,setuser}}>
      <Routes>
        <Route path='/' element={
          <>
          <Navbar/>
          <Carousel images={imgs}/>
          <Food/>
          </>
        }
        />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/mycart' element={<Mycart/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      </countercontext.Provider>
    </>
  )
}

export default App
