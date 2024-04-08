import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { mapMonth } from '../../../../utils/constant';
import './BoxChartBar.css';

function BoxChartBar({optionsChart}){
  const csvData = useSelector(state => state.csv.data);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = mapMonth;
  const data = {
    labels,
    datasets: [
      {
        label: optionsChart.titleElement,
        data: csvData[optionsChart.key].map(elm => elm),
        backgroundColor: optionsChart.color,
      }
    ],
  };
  return (
    <>
      <div className='bx-md-hd'>
        {optionsChart?.title ?? ''}
      </div>
      <div className='bx-md-bd'>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default BoxChartBar;