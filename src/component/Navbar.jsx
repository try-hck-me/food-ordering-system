import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { countercontext } from '../context/context'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  const value=useContext(countercontext)
  const navigate = useNavigate();
  const gologin=()=>{
    navigate('/login')
  }
  const gosignup=()=>{
    navigate('/signup')
  }
  const gocart=()=>{
    navigate('/mycart')
  }
  const goprofile=()=>{
    navigate('/profile')
  }
  const gologout=()=>{
    
    localStorage.removeItem("authToken")
    value.setuser({})
    console.log(value.user);
    
    navigate('/')

  }
  return (
    <div className='flex bg-black text-white justify-around items-center'>
      <div>
         <div className='text-3xl py-2 pl-4'><h1><b>FoodCOM</b></h1></div>
      </div>
      {localStorage.getItem("authToken")?<><div>
        <button onClick={gocart} className=' bg-red-600 px-2 py-1 rounded-xl mx-1 hover:bg-red-700'>Mycart</button>
        <button onClick={gologout} className=' bg-red-600 px-2 py-1 rounded-xl mx-1 hover:bg-red-700'>LogOut</button>
        <button onClick={goprofile} className='text-red-600 bg-white py-2 px-3 rounded-full ml-3'><FontAwesomeIcon icon={faUser} size="x" /></button>
      </div></>:<><div>
        <button onClick={gologin} className=' bg-red-600 px-2 py-1 rounded-xl mx-1 hover:bg-red-700'>LogIn</button>
        <button onClick={gosignup} className=' bg-red-600 px-2 py-1 rounded-xl mx-1 hover:bg-red-700'>SignUp</button>
      </div></>}
    </div>
  )
}

export default Navbar
