import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend 
} from "chart.js";
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { mapMonth } from '../../../../utils/constant';
import './BoxChartLine.css';

function BoxChartLine({optionsChart}){
  const csvData = useSelector(state => state.csv.data);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = mapMonth;
  
  const data = {
    labels,
    datasets: [
      {
        label: optionsChart.titleElement,
        data: csvData.map(elm => elm[optionsChart.key]),
        borderColor: optionsChart.color,
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
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default BoxChartLine;