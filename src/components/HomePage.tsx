import Link from "next/link"
import employe from "../../public/images/employe.png"
import feedback from "../../public/images/feedback.jpg"

export default function HomePage(){
    return <div className="home-page-div">
        <div className="left-div">
           <div className="inner-div">
            <div className="img"><img className="inside-img" src={feedback.src} alt="" /></div>
            <div className="feed-div">
                <div className="inside-fd">Please give your feedback</div>
                <div className="btn-fd"><button className="btn"><Link href="/feedbackinput">Feedback</Link></button></div>
            </div>
           </div>
        </div>
        <div className="right-div">
        <div className="inner-div">
            <div className="img"><img className="inside-img" src={employe.src} alt="" /></div>
            <div className="feed-div">
                <div className="inside-fd">please login or signup</div>
                <div className="btn-fd"><button className="btn"><Link href="/login">Login</Link></button></div>
                <div className="btn-fd login"><button className="btn"><Link href="/signup">SignUp</Link></button></div>
            </div>
            
           </div>
        </div>
    </div>
}