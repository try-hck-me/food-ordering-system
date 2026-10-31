import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './signup.css';
import { v4 as uuidv4 } from 'uuid';
const Signup = () => {
    const navigate =useNavigate()
    const [ispassvisi, setispassvisi] = useState(false)
    const togglepass= () => {
    setispassvisi(!ispassvisi);
  };
  const gohome=()=>{
    navigate('/');
  };

  
  const [form, setform] = useState({name:"",city:"",phone:"",email:"",password:""})
  const [userarray, setuserarray] = useState([])
  
  const handlechange=(e)=>{
    setform({...form,[e.target.name]:e.target.value})
  }
  const submitform=async ()=>{
    if(form.name.length>0 && form.password.length>0 && form.email.length>0){
        setuserarray([...userarray,{...form,id:uuidv4()}])
        let res= await fetch("http://localhost:5000/signup",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
        setform({name:"",city:"",phone:"",email:"",password:""})
        navigate('/login')
    }
    
    
  }
  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading
    // Handle form submission logic here
    console.log('Form submitted:', form);
  };

  return (
    <div>
      <div className='bg-zinc-950 w-[100vw] min-h-[100vh] text-white '>
        <div className='text-center pt-24'><h1>SignUp</h1></div>
        <div className='lg:w-[33%] md:w-[50%] w-[75%] h-[450px] mx-auto bg-zinc-800 rounded-3xl flex-col relative'>
           <form onSubmit={handleSubmit}>
              <div className='pt-4 pl-10'>
                 <h6>Name</h6>
                  <input type="text" value={form.name} name='name' onChange={handlechange} placeholder='Enter your name'  className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
              </div>
              <div className='pt-2 pl-10'>
                  <h6>City</h6>
                  <input type="city" placeholder='Enter your city' value={form.city} name='city' onChange={handlechange} className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
              </div>
              <div className='pt-2 pl-10'>
                  <h6>Phone no</h6>
                  <input type="tel" placeholder='Enter your name' value={form.phone} name='phone' onChange={handlechange} className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
              </div>
              <div className='pt-2 pl-10'>
                  <h6>Email Id</h6>
                  <input type="email" placeholder='Enter your email id' value={form.email} name='email' onChange={handlechange} className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
              </div>
              <div className='pt-2 pl-10 relative'>
                  <h6>Password</h6>
                  <input type={ispassvisi ? 'text' : 'password'} value={form.password} name='password' onChange={handlechange} placeholder='Enter your password'  className='text-black w-[88%] h-[30px] rounded-xl pl-3'/>
                  <FontAwesomeIcon icon={ispassvisi ? faEye : faEyeSlash} onClick={togglepass} className='text-black absolute bottom-[6px] right-[60px]'/>
              </div>
              <div className=' text-center mt-4'>
                  <button onClick={submitform} className='bg-red-600 text-2xl px-3 pb-1 rounded-2xl '>SignUp</button>
              </div>
           </form>
         <div className='text-center pt-2'>
           <p>Alreay have an account?<Link to="/login">Login</Link></p>
            
         </div>
         <div className='absolute right-4 top-0 '>
            <button onClick={gohome} className='text-3xl hover:bg-red-600 px-3 pb-2'>x</button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
