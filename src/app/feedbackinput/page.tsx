"use client"
import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function Home(){
    const [feedbackInput,setFeedbackInput]=useState<string>('');

    const router=useRouter();

    useEffect(()=>{
        const checkAuthStatus=async ()=>{
          try {
            const response=await supabase.auth.getSession();
            console.log(response);
            console.log('started');
            console.log(response);
            
            if(response.data.session){
                router.push('/feedback')
            }
            console.log('end');
            
          } catch (error) {
            console.log('error');
            
          }
        }
        checkAuthStatus();
    },[router])
    const logout=async()=>{
        try {
            const response=await supabase.auth.signOut();
            console.log('inside logout btn');
            
            
            
                router.push('/login');
            
        } catch (error) {
            console.log('error doing signout');
            
        }
    }


    const handlesubmit=async()=>{
        console.log('button clicked');
        
        // const {error}=await supabase.from('feedback').insert([
        //     {text:feedbackInput}
        // ])
        // if(error) console.log('error');
        // else setFeedbackInput('');
        try {
            const response=await supabase.from('feedback').insert([
                {text:feedbackInput}
            ])
            console.log(response);
            
        } catch (error) {
            console.log('error submitting feedback');
            
        }
    }

    return <div>
        <h1>Feedback</h1>
        <label htmlFor="">please give your valuable feedback</label>
        <input type="text" value={feedbackInput} onChange={(e)=>{setFeedbackInput(e.target.value)}} />
        <button onClick={handlesubmit}>submit</button>
    </div>
}