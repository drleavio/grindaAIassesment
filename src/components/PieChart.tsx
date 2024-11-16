// components/SentimentPieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentPieChartProps {
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

const PieChart: React.FC<SentimentPieChartProps> = ({
  positiveCount,
  negativeCount,
  neutralCount,
}) => {
  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Analysis',
        data: [positiveCount?positiveCount:0, negativeCount?negativeCount:0, neutralCount?neutralCount:0],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffcd56'],
        hoverBackgroundColor: ['#36a2eb99', '#ff638499', '#ffcd5699'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div style={{ width: '100%', height: '500px',display:"flex",alignItems:"center",justifyContent:"center",marginTop:"100px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
