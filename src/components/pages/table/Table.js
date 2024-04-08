import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { getMetricsMainStream } from '../../../api/MetricApi';
import BreadCrumb from '../../breadcrumb/BreadCrumb';
import './Table.css';

function Table(){
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const breadcrumb = ['Table'];
  const limitPg = 100;

  useEffect(() => {
    if(isLoading){
      sendRequestByPage(page);
    }
  }, []);

  const goToPage = (numb) => {        
    if(!isLoading){
      let pg = page;
      if(numb === 1){
        pg++;
      }else if(numb === 0 && page > 1){
        pg--;
      }
      if(pg !== page){
        sendRequestByPage(pg);   
      }    
    }
}

  const pageRange = (pg) => {
    return [(pg - 1) * limitPg, pg * limitPg];
  }

  const sendRequestByPage = async (pg) => {
    setIsLoading(true); 
    await getMetricsMainStream(pageRange(pg)).then(reader => {
      let partialData = '';
      return reader.read().then(function processResult(result) {          
        if(result.done){
          return partialData;
        }
        partialData += new TextDecoder().decode(result.value, { stream: true });
        return reader.read().then(processResult);
      }).then(partialData => {          
          setTimeout(() => { setPage(pg); setIsLoading(false); }, 500); 
          try{
            const tab = JSON.parse(partialData);
            setTableData(tab); 
          } catch(e){
            console.error(e, partialData);
          }
      });
    });
  }

  return (
    <div className='mtc-dbrd'>
      <BreadCrumb arrayBreadCrumb={breadcrumb} />     
        <>          
          <div className={'box-admin-highlight'}>
            <div className='mtc-tb-cont'>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Propulso ID</th>
                  <th scope="col">Latitude</th>
                  <th scope="col">Longitude</th>
                  <th scope="col">Delta time</th>
                  <th scope="col">TimeStamp</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((elm, index) => {
                    return (
                      <tr key={index}>
                        <td>{(index + 1)}</td>
                        <td>{elm.id}</td>
                        <td>{elm.lat}</td>
                        <td>{elm.lon}</td>
                        <td>{elm.delta_time}</td>
                        <td>{elm.timestamp}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='fltr'>
            <div className='mtc-tb-pg' onClick={() => goToPage(0)}>
              <FontAwesomeIcon icon={faChevronLeft} style={{fontSize: "1.3rem"}} />
            </div>
            <div className='mtc-tb-pg-nb'>
              {page}
            </div>
            <div className='mtc-tb-pg' onClick={() => goToPage(1)}>
              <FontAwesomeIcon icon={faChevronRight} style={{fontSize: "1.3rem"}} />
            </div>
            <div className='clrboth'></div>
          </div>
          <div className='clrboth'></div>
        </>
    </div>
  );
}

export default Table;