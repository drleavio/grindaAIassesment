"use client"
import { supabase } from "@/supabase/client";
import spinner from "../../public/images/spinner.svg"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Feedback{
    feedbackId:number;
    text:string;
    sentiment:string;
    summary:string;
}



const InsightsDashboard=()=>{
    const [feedbackList,setFeedbackList]=useState<Feedback[]>([]);
    const [loading,setLoading]=useState<boolean>(false);
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
                console.log('error fetching data',error);
                
            }
        }
        fetchData();
    },[])
    const logout=async()=>{
        try {
            setLoading(true)
            const response=await supabase.auth.signOut();
            // console.log(response);
            console.log(response);
            if(response.error){
                console.log(response.error);
                
            }
            
            router.push('/login')
            toast.success("logout successfully")
        } catch (error) {
            console.log('error doing logout',error);
            toast.error("something wrong")
            
        }
        finally{
            setLoading(false)
        }
    }
    return <div className="dashboard-container">
       <div className="t-container">
       <div className="header">feedback</div>
       <button className="btn" onClick={logout}>{loading?<img className="spin-img" src={spinner.src}/>:null}signout</button>
       </div>
        <div>
            <table>
                <thead>
                   <tr>
                   <th>index</th>
                    <th>feedback</th>
                    <th>sentiments</th>
                    <th>summary</th>
                   </tr>
                </thead>
                <tbody>
                {
                feedbackList.map((data,ind)=>{
                    return <tr key={ind}>
                        <td>{ind+1}</td>
                        <td>{data.text}</td>
                        <td>{data?.sentiment}</td>
                        <td>{data?.summary}</td>
                    </tr>
                })
            }
                </tbody>
            </table>
           
           
        </div>
    </div>
}

export default InsightsDashboard;