import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";

export function useAuth(){
    const [user,setUser]=useState<any>(null);
    const [loading,setLoading]=useState<boolean>(true);

    useEffect(()=>{
        const currentUser= supabase.auth.getSession();
        setUser(currentUser);
        setLoading(false)

        const {data:authListener}=supabase.auth.onAuthStateChange((_,session)=>{
            setUser(session?.user || null)
            setLoading(false)
        })

        return ()=>{
            authListener?.subscription.unsubscribe();
        }
    },[])
    return {user,loading};
}