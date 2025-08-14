import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/shopContext";
const Login = () => {
  const [currentstate,setCurrentState]=useState('Log In');
  const {token ,setToken,navigate,backendUrl} =useContext(ShopContext)

  const[name,setName] =useState('')
  const[password,setPassword] =useState('')
  const[email,setEmail] =useState('')

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try{
      if(currentstate ==='Sign Up'){
        const response=await axios.post(backendUrl +'/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response=await axios.post(backendUrl+'/api/user/login',{email,password})
        console.log(response.data);
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch (error) {
  console.log(error);

  // Check if it's an API error with a proper message
  if (error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message); // e.g., "User already exists"
  } else {
    toast.error("Something went wrong. Please try again.");
  }
}

    // catch(error){
    //   console.log(error);
    //   toast.error(error.message)
    // }
  }
  return (
    <form onSubmit={onSubmitHandler}className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentstate==='Log In'?'' :<input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required/>}
       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required/>
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your password?</p>
          {
            currentstate==='Log In'
              ?<p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer">Create Account</p>
              : <p onClick={()=>setCurrentState('Log In')} className="cursor-pointer">Already have an account?</p>
          }
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentstate==='Log In'?'Sign In' :'Sign Up'}</button>
    </form>
  )
}

export default Login
