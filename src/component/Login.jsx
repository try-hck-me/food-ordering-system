import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { json } from 'react-router-dom';
import { countercontext } from '../context/context'
import { useContext } from 'react'
const Login = () => {
  const value=useContext(countercontext)
  const [islogged, setislogged] = useState(false) 
   const navigate=useNavigate()
   const [ispassvisi, setispassvisi] = useState(false)
   const togglepass= () => {
    setispassvisi(!ispassvisi);
  };
  const gohome=()=>{
   navigate('/');
  }

  const [form, setform] = useState({email:"",password:""})
  const handlechange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
   //  console.log(form);
    
  }

  useEffect(() => {
    console.log(value.user);
  }, [value.user])
  

  const handlesubmit = (event) => {
   event.preventDefault(); // Prevent the page from reloading
   // Handle form submission logic here
   console.log('Form submitted:');
 };

 const submitform=async ()=>{
   let res=await fetch("http://localhost:5000/login",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify(form)})
   let data=await res.json()
   
   if(res.ok){
      
      localStorage.setItem("authToken",JSON.stringify(true));
      console.log(localStorage.getItem("authToken"));
      console.log(data.usser);
      
      value.setuser(data.usser)
  
      
      navigate('/');
      
   }else{
      localStorage.setItem("authToken",JSON.stringify(false));
      alert("invalid email or password")
   }
   
   
 }
  return (
    <div className='bg-zinc-950 w-[100vw] h-[100vh] text-white '>
      <div className='text-center pt-28'><h1>LogIn</h1></div>
      <div className=' lg:w-[25%] md:w-[50%] w-[75%] h-[300px] mx-auto bg-zinc-800 rounded-3xl flex-col relative'>
        <form onSubmit={handlesubmit}>
         <div className='pt-10 pl-10'>
            <h6>Email Id</h6>
            <input type="email" value={form.email} name='email' onChange={handlechange} placeholder='Enter your email id'  className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
         </div>
         <div className='pt-6 pl-10 relative'>
            <h6>Password</h6>
            <input type={ispassvisi ? 'text' : 'password'} value={form.password} name='password' onChange={handlechange} placeholder='Enter your password'  className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
            <FontAwesomeIcon icon={ispassvisi ? faEye : faEyeSlash} onClick={togglepass} className='text-black absolute bottom-[6px] right-12'/>
         </div>
         <div className=' text-center mt-4'>
            <button onClick={submitform} className='bg-red-600 text-2xl px-3 pb-1 rounded-2xl '>LogIn</button>
         </div>
         
         <div className='text-center pt-3'>
           <p>If you don't have any account<Link to="/signup"> Sign Up</Link></p>
            
         </div>
         <div className='absolute right-4 top-0 '>
            <button onClick={gohome} className='text-3xl hover:bg-red-600 px-3 pb-2'>x</button>
         </div>
      </form>
      </div>
      
    </div>
  )
}

export default Login
