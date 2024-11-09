import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { Session, User } from '@supabase/supabase-js'; 

export function useAuth(){
    const [user,setUser]=useState<User | null>(null);
    const [loading,setLoading]=useState<boolean>(true);


    useEffect(() => {
        
        const getSession = async () => {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error('Error getting session:', error);
          } else {
            setUser(data.session?.user || null);
          }
          setLoading(false);
        };
    
        getSession();
    
      
        const { data: authListener } = supabase.auth.onAuthStateChange((_, session: Session | null) => {
          setUser(session?.user || null); 
          setLoading(false);
        });
    
       
        return () => {
          authListener?.subscription.unsubscribe();
        };
      }, []);
    return {user,loading};
}