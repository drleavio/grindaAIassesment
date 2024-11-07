import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const withAuth=(WrappedComponent:React.ComponentType)=>{
    const AuthenticatedComponent=(props:any)=>{
        const router=useRouter();
        useEffect(()=>{
            const checkUser=async()=>{
                const user=await supabase.auth.getSession();
                if(!user){
                    router.push('/login');
                }
            }
            checkUser();
        },[router]);
        return <WrappedComponent {...props}/>
    }
    return AuthenticatedComponent;
}
export default withAuth;