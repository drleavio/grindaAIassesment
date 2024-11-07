"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp(){

    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [error,setError]=useState<string|null>(null)
    const router=useRouter();


    const {user,loading}=useAuth();

    useEffect(()=>{
        if(!loading && user){
            router.replace("/feedback")
        }
    },[user,router,loading])

    const handleclick=async()=>{
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
    }

    return <div>
         <div>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}} required/>
            <label htmlFor="password">Password</label>
            <input type="text" onChange={(e)=>{setPassword(e.target.value)}} required/>
            <button onClick={handleclick}>signup</button>
          
                {
                    error?<div>error doing signup</div>:null
                }
           
            <div>already have an account<Link href="/login">Signin</Link></div>
         </div>
    </div>
}