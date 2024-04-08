import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMetricsStatsStream } from '../../../api/MetricApi';
import BreadCrumb from '../../breadcrumb/BreadCrumb';
import ModalLoading from '../../widgets/modal/loading/ModalLoading';
import LazyLoad from '../lazyload/LazyLoad';
import BoxContentOne from '../../widgets/box/boxContentOne/BoxContentOne';
import BoxChartLine from '../../widgets/box/boxChartLine/BoxChartLine';
import BoxChartBar from '../../widgets/box/boxChartBar/BoxChartBar';
import { processCsvData, 
  formatModalData, 
  covertStreamDataToJson,
  setDataBoxSmDashBoard,
 } from '../../../utils/tools';
import { updateCsvData, updateStatInit } from '../../../../src/redux/Store';
import './DashBoard.css';

function DashBoard(){
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(useSelector(state => !state.initialized.value));
  const [boxes, setBoxes] = useState([]);
  const [modalData, setModalData] = useState({
    lineCount: 0,
    fileSize: 0,
    chunkSize: 0,
    timer: 0
  });
  const breadcrumb = ['Dashboard'];
  let csvData = useSelector(state => state.csv.data);
  let initialized = useSelector(state => state.initialized.value);

  useEffect(() => {
    if(initialized){
      setBoxes(setDataBoxSmDashBoard(csvData));
    }else{
      sendRequestByMonth();
    }
  }, []);

  const sendRequestByMonth = async () => {
    const startTimer = Date.now();
    let statsResult = {};
    await getMetricsStatsStream().then(reader => {
      let partialData = '';
      return reader.read().then(function processResult(result) {          
        if(result.done){
          return partialData;
        }
        partialData += new TextDecoder().decode(result.value, { stream: true });
        const json   = covertStreamDataToJson(partialData);
        statsResult  = new TextDecoder().decode(result.value, { stream: true });
        setModalData(formatModalData(json, startTimer));

        return reader.read().then(processResult);
      }).then(() => {
        csvData = processCsvData(statsResult);
        dispatch(updateCsvData(csvData));
        setIsLoading(false);    
        dispatch(updateStatInit(true));        
        setBoxes(setDataBoxSmDashBoard(csvData));
      });
    });    
  }

  return (
    <div className='mtc-dbrd'>
      <BreadCrumb arrayBreadCrumb={breadcrumb} />
      {isLoading && (
        <>
          <LazyLoad />
          <ModalLoading show={true} modalData={modalData} />
        </>
      )}
      {!isLoading && (
        <>
          <div className='mtc-lzy-container-sm'>
            {Array(4).fill('box-admin-highlight').map((clss, index) => {
              return (
                <div className={`${boxes[index]?.bot}${clss}`} key={index}>
                  <BoxContentOne options={boxes[index]} />
                </div>
              )
            })}
          </div>
          <div className='mtc-lzy-container-md'>
            {Array(2).fill('box-admin-highlight').map((clss, index) => {
              const chart = index === 0 ? 
              <BoxChartLine optionsChart={{
                title: 'Average monthly visits duration (min)', 
                titleElement: 'Minutes', 
                key: 'monthlyDurationRecord', 
                color: 'rgb(255, 99, 132)'}} /> : 
              <BoxChartBar optionsChart={{
                title: 'Average monthly speed (Meters/secs)', 
                titleElement: 'Meters/secs', 
                key: 'monthlySpeedRecord', 
                color: 'rgba(53, 162, 235, 0.5)'}} />;
              return (<div className={clss} key={index}>{chart}</div>)
            })}
          </div>
          <div className='mtc-lzy-container-md'>
            {Array(2).fill('box-admin-highlight').map((clss, index) => {
              const chart = index === 0 ? 
              <BoxChartLine optionsChart={{title: 'Monthly visits', 
                titleElement: 'Visits', 
                key: 'monthlyVisitRecord', 
                color: 'rgb(104, 110, 255)'}} /> : 
              <BoxChartBar optionsChart={{
                title: 'Monthly visitors', 
                titleElement: 'Visitors', 
                key: 'monthlyVisitorRecord', 
                color: 'rgb(135, 138, 153)'}} />;
              return (<div className={clss} key={index}>{chart}</div>)
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default DashBoard;