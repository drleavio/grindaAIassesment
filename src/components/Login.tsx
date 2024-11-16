"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import spinner from "../../public/images/spinner.svg"
import { toast } from 'react-toastify';



export default function Login(){

    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [error,setError]=useState<string>('')
    const [loading,setLoading]=useState<boolean>(false);
    const router=useRouter();
    

   
    useEffect(()=>{
        const checkAuth=async()=>{
            const response=await supabase.auth.getSession();
            console.log(response);
            if(response.data.session){
                router.push("/feedback")
            }
            
        }
        checkAuth();

    },[router])
    
  
    const handleclick=async()=>{
        setLoading(true)
        const {error} = await supabase.auth.signInWithPassword({email,password});
        if(error){
            toast(error.message)
            setError(error.message)
        }else{
            toast.success("login successfull")
            router.push("/feedback")
        }
        
        
        setLoading(false)
    }

    return <div className="signin-container">
        <h1 className="header">Login</h1>
           <div className="inside-signin">   
           <label className="label" htmlFor="email">Email</label>
            <input className="inp-box" type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <label className="label" htmlFor="password">Password</label>
            <input className="inp-box" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button disabled={loading} onClick={handleclick} className="btn">{loading?<img className="spin-img" src={spinner.src} alt="" />:null}Login</button>
            {error?<div>{error}</div>:null}
            <div>don&apos;t have an account ? please <Link href="/signup" style={{color:"skyblue"}}>Signup</Link></div>
           </div>
         </div>
    
}