"use client"
import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import spinner from "../../../public/images/spinner.svg"



export default function Home(){
    const [feedbackInput,setFeedbackInput]=useState<string>('');
  const [loading,setLoading]=useState<boolean>(false)

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
            console.log('error',error);
            
          }
        }
        checkAuthStatus();
    },[router])


    const handlesubmit=async()=>{
        
        
       
        try {
          
            setLoading(true)
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer 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`, 
                },
                body: JSON.stringify({
                  model: 'gpt-4o-mini', 
                  messages: [{ role: 'system', content: 'You are an assistant that provides sentiment analysis and summaries.' },
                    { role: 'user', content: `Please provide both a summary and a sentiment analysis for the following text:\n"${feedbackInput}}"` },],
                }),
              });
        
              const data = await res.json();
     
              const results = data.choices[0].message.content;
              console.log("ai results",results);
              
  


            const summaryMatch = (text:string) => {
                const match = text.match(/Summary:?\s*\**\s*([\s\S]+?)(?=\n|$)/i);
        return match ? match[1].trim() : 'No summary found';
              };



              const sentimentMatch = (text:string) => {
                const match = text.match(/Sentiment Analysis:?\s*\**\s*([\s\S]+?)(?=\n|$)/i);
                return match ? match[1].trim() : 'No sentiment found';
              };
              
              
              console.log("summary ##",summaryMatch(results));
              console.log("senti ##",sentimentMatch(results));
              
            
            console.log('response submitting');
            
            const response=await supabase.from('feedback').insert([
                {text:feedbackInput,sentiment:sentimentMatch(results),summary:summaryMatch(results)}
            ])
            setFeedbackInput('');
           setLoading(false)
            console.log(response);
            
        } catch (error) {
            console.log('error submitting feedback',error);
            
        }
    }

    return <div className="feedback-container">
        <h1>Feedback</h1>
       <div className="inside-fc">
       
        <label htmlFor="">please give your valuable feedback</label>
        <input className="inp" type="text" value={feedbackInput} onChange={(e)=>{setFeedbackInput(e.target.value)}} />
        <button className="btn" disabled={loading} onClick={handlesubmit}>{loading?<img className="spin-img" src={spinner.src}/>:null}submit</button>
        <div>if you are an employee please <Link style={{color:"skyblue"}} href="/login">Login</Link></div>
       </div>
    </div>
}