"use client"
import { supabase } from "@/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Feedback{
    feedbackId:number;
    text:string;
    sentiment:string;
    summary:string;
}

const InsightsDashboard=()=>{
    const [feedbackList,setFeedbackList]=useState<Feedback[]>([]);
    const router=useRouter();
    useEffect(()=>{
        const fetchData=async()=>{
            const user=await supabase.auth.getSession();
            console.log(user);
            
            if(!user.data.session){
                console.log('user is not authenticated');
                router.push('/login')
            }
            try {
                const response=await supabase.from('feedback').select('*')
                if(response.data){
                    setFeedbackList(response.data);
                }
            } catch (error) {
                console.log('error fetching data');
                
            }
        }
        fetchData();
    },[])
    const logout=async()=>{
        try {
            const response=await supabase.auth.signOut();
            router.push('/login')
        } catch (error) {
            console.log('error doing logout');
            
        }
    }
    return <div>
        <div>feedback</div>
        <div>
            {
                feedbackList.map((data)=>{
                    return <div key={data.feedbackId}>
                        <div>{data.text}</div>
                        <div>{data?.sentiment}</div>
                        <div>{data?.summary}</div>
                    </div>
                })
            }
            <button onClick={logout}>signout</button>
        </div>
    </div>
}

export default InsightsDashboard;