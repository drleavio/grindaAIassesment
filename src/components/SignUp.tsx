"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import spinner from "../../public/images/spinner.svg"

export default function SignUp(){

    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [error,setError]=useState<string|null>(null)
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
        if(!email || !password){
            setError('please provide both email and password')
            return;
        }
        const {error} = await supabase.auth.signUp({email,password});
        if(error){
            console.log(error);
            
            setError(error.message)
        }else{
            router.push("/login")
        }
        setLoading(false);
    }

    return <div className="signup-container">
        <h1 className="header">SignUp</h1>
         <div className="inside-signin">
            <label className="label" htmlFor="email">Email</label>
            <input className="inp-box" type="text" onChange={(e)=>{setEmail(e.target.value)}} required/>
            <label className="label" htmlFor="password">Password</label>
            <input className="inp-box" type="text" onChange={(e)=>{setPassword(e.target.value)}} required/>
            <button disabled={loading} onClick={handleclick} className="btn">{loading?<img className="spin-img" src={spinner.src} alt="" />:null}Signup</button>
          
                {
                    error?<div>error doing signup</div>:null
                }
           
            <div>already have an account ? please <Link href="/login" style={{color:"skyblue"}}>Signin</Link></div>
         </div>
    </div>
}