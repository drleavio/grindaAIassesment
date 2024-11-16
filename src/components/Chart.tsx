// components/SentimentBarChart.tsx
"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SentimentBarChartProps {
  positive: number;
  negative: number;
  neutral: number;
}

const SentimentBarChart: React.FC<SentimentBarChartProps> = ({ positive, negative, neutral }) => {
  const data: ChartData<'bar'> = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Sentiment Analysis',
        data: [positive, negative, neutral],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Green for Positive
          'rgba(255, 99, 132, 0.6)', // Red for Negative
          'rgba(255, 206, 86, 0.6)', // Yellow for Neutral
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
        
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sentiment Analysis',
      },
    },
  };

  return <Bar data={data} options={options} style={{height:"200px",width:"80px"}}/>;
};

export default SentimentBarChart;
