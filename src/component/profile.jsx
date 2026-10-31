import React from 'react'
import { countercontext } from '../context/context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate=useNavigate()
    const value=useContext(countercontext)
    const gohome=()=>{
        navigate('/')
    }
  return (
    <div>
      <div className='bg-zinc-950 w-[100vw] min-h-[100vh] text-white '>
        <div className='text-center pt-24'><h1>Myprofile</h1></div>
        <div className='lg:w-[27%] md:w-[45%] w-[75%] h-[300px] mx-auto bg-zinc-800 rounded-3xl flex-col relative'>
            <div className='pl-5 pt-6'><h3><span className='text-red-600'>Name</span> : {value.user.name}</h3></div>
            <div className='pl-5'><h3><span className='text-red-600'>City</span> : {value.user.city}</h3></div>
            <div className='pl-5 '><h3><span className='text-red-600'>phone no</span> : {value.user.phone}</h3></div>
            <div className='pl-5'><h3><span className='text-red-600'>Email</span> : {value.user.email}</h3></div>    
            <div className='text-center'><button onClick={gohome} className='bg-red-600 px-2 py-1 text-xl rounded-lg mt-4 text-center hover:bg-red-700'><b>GoHome</b></button> </div>  
        </div>
      </div>
    </div>
  )
}

export default Profile
