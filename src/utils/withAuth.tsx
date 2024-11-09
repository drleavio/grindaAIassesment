import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
// import { Session, User } from '@supabase/supabase-js';


type WithAuthProps = Record<string, unknown>;

// const withAuth=(WrappedComponent:React.ComponentType)=>{
//     const AuthenticatedComponent=(props:any)=>{
//         const router=useRouter();
//         useEffect(()=>{
//             const checkUser=async()=>{
//                 const user=await supabase.auth.getSession();
//                 if(!user){
//                     router.push('/login');
//                 }
//             }
//             checkUser();
//         },[router]);
//         return <WrappedComponent {...props}/>
//     }
//     return AuthenticatedComponent;
// }


const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
    const AuthenticatedComponent: React.FC<P> = (props) => {
      const router = useRouter();
  
      useEffect(() => {
        const checkUser = async () => {
          const { data, error } = await supabase.auth.getSession();
  
          if (error) {
            console.error('Error getting session:', error);
            return;
          }
  
          if (!data?.session?.user) {
            router.push('/login');
          }
        };
  
        checkUser();
      }, [router]);
  
      return <WrappedComponent {...props} />;
    };
  
    return AuthenticatedComponent;
  };
export default withAuth;