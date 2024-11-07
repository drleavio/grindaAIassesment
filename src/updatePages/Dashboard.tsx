import InsightsDashboard from "@/components/InsightsDashboard";
import withAuth from "@/utils/withAuth";


const Dashboard=()=>{
    return <div>
        <h1>Feedback Insights</h1>
        <InsightsDashboard/>
    </div>
}

export default withAuth(Dashboard);