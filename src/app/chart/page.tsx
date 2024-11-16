// pages/index.tsx
"use client"
import React, { useEffect, useState } from 'react';
import SentimentBarChart from '../../components/Chart';
import { supabase } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import spinner from "../../../public/images/spinner.svg"
import PieChart from '@/components/PieChart';

export default function Home() {
  const [positiveCount,setPositiveCount]=useState(0);
  const [negativeCount,setNegativeCount]=useState(0);
  const [neutralCount,setNeutralCount]=useState(0);
  const [loading,setLoading]=useState<boolean>(false);
  const [chartType,setChartType]=useState<'pie' | 'bar'>('bar');
  const router=useRouter();


  useEffect(()=>{

    const checkAuth=async()=>{
        const user=await supabase.auth.getSession();
        if(!user.data.session){
            console.log('user is not authenticated');
            router.push('/login')
        }
    }


    const fetchdata=async ()=>{
        const { data: positiveData, error: positiveError } = await supabase
        .from('feedback')
        .select('*', { count: 'exact' })
        .eq('sentiment', 'Positive');
  
        const { data: negativeData, error: negativeError } = await supabase
        .from('feedback')
        .select('*', { count: 'exact' })
        .eq('sentiment', 'Negative');

        const { data: neutralData, error: neutralError } = await supabase
        .from('feedback')
        .select('*', { count: 'exact' })
        .eq('sentiment', 'Neutral');

        if (positiveError || negativeError || neutralError) {
            console.error('Error fetching sentiment counts:', positiveError || negativeError || neutralError);
            return null;
          }
        setPositiveCount(positiveData?.length);
        setNegativeCount(negativeData?.length);
        setNeutralCount(neutralData?.length)
        
        
    }
    checkAuth();
    fetchdata();

  },[])

  const handleClick=async()=>{
   try {
    setLoading(true)
    const res=await supabase.auth.signOut();
    if(res){
        router.push('/login')
    }
   } catch (error) {
    console.log(error);
   }
   finally{
    setLoading(false)
   }
  }


  return (
    <div style={{height:"100vh",width:"100vw"}}>
      <div style={{display:"flex", alignItems:"center",justifyContent:"space-between",padding:"20px"}}>
      <h1 style={{fontSize:"20px",fontWeight:"600"}}>Sentiment Analysis</h1>
      <select onChange={(e)=>{setChartType(e.target.value as 'pie' | 'bar')}} value={chartType} style={{padding:"10px", backgroundColor:"skyblue",borderRadius:"8px"}}>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Graph</option>
      </select>
      <button style={{padding:"10px",backgroundColor:"skyblue",borderRadius:"8px"}}><Link href="/feedback">view Dashboard</Link></button>
      <button style={{padding:"10px",backgroundColor:"skyblue",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}} className='btn' onClick={handleClick}>{loading?<img className="spin-img" src={spinner.src}/>:null}Signout</button>
      </div>
      <div style={{width:"100%"}}>
      {
        chartType=='bar'?<SentimentBarChart positive={positiveCount} negative={negativeCount} neutral={neutralCount} />:<PieChart positiveCount={positiveCount} negativeCount={negativeCount} neutralCount={negativeCount}/>
      }
      </div>
    </div>
  );
}
