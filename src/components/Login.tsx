"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";


export default function Login(){

    const [email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');
    const [error,setError]=useState<string>('')
    const router=useRouter();

    const {user,loading}=useAuth();
    useEffect(()=>{
        // console.log('started');
        // console.log(user);
        
        // if(!loading && user){
            
        //     console.log('logged in');
            
        //     router.replace("/feedback")
        // }
        // console.log('end');
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
        const {error} = await supabase.auth.signInWithPassword({email,password});
        if(error){
            setError(error.message)
        }else{
            router.push("/feedback")
        }
    }

    return user?<p>already logged in go to <Link href="/feedback">feedback section</Link></p>: <div>
         <div>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <label htmlFor="password">Password</label>
            <input type="text" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button onClick={handleclick}>Login</button>
            <div>don't have an account please <Link href="/">Signup</Link></div>
         </div>
    </div>
}