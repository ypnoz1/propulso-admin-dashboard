import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faClock, faPersonRunning, faEye } from "@fortawesome/free-solid-svg-icons";
import { CSV_FILE_PART_OF_MONTH } from '../utils/constant';

export const numbFormat = (nb) => Number.isNaN(nb) ? 0 : new Intl.NumberFormat().format(nb);

export const formatModalData = (data, startTimer) => {              
    const endTimer = Date.now();
    const timer = (endTimer - startTimer) / 1000;
    return {
        lineCount: data.lineCount,
        fileSize:  data.fileSize,
        chunkSize: data.chunkSize,
        perc: parseInt((data.chunkSize / data.fileSize) * 100),
        timer
    };
}

export const covertStreamDataToJson = (partialData) => {
    let validJson = {};
    try {
        const lines     = partialData.split('\n');
        const data      = lines[lines.length - 1];
        let lastElement = data.split('}{');
        lastElement     = lastElement[lastElement.length - 1];  
        const json      = `{${lastElement}`;
        validJson       = JSON.parse(json);
    } catch(e){
        //console.error(e);
    }
    return validJson;
}

export const processCsvData = (month, newData, currentData) => {
    const json = covertStreamDataToJson(newData);
    const secsToMin = parseInt((json?.avgVisitTime ?? 0) / 60);
    const formattedData = [{
        month,
        visits: json?.visits ?? 0,
        visitors: json?.visitors ?? 0,
        visitAvgDuration: secsToMin,
        visitAvgSpeed: json?.avgSpeed ?? 0,
    }];
    const uptedData = currentData.filter(elm => parseInt(elm.month) !== parseInt(month))
    return uptedData.concat(formattedData);
}

export const setDataBoxSmDashBoard = (data) => {
    let visits = 0;
    let visitors = 0;
    let visitAvgDuration = 0;
    let visitAvgSpeed = 0;

    let bestVisits = 0;
    let bestVisitors = 0;
    let bestVisitAvgDuration = 0;
    let bestVisitAvgSpeed = 0;
    data.forEach(element => {
        visits += element?.visits ?? 0;
        visitors += element?.visitors ?? 0;
        visitAvgDuration += element?.visitAvgDuration ?? 0;
        visitAvgSpeed += element?.visitAvgSpeed ?? 0;

        bestVisits = element?.visits ?? 0 > bestVisits ? element?.visits ?? 0 : bestVisits;
        bestVisitors = element?.visitors ?? 0 > bestVisitors ? element?.visitors ?? 0 : bestVisitors;
        bestVisitAvgDuration = element?.visitAvgDuration ?? 0 > bestVisitAvgDuration ? element?.visitAvgDuration ?? 0 : bestVisitAvgDuration;
        bestVisitAvgSpeed = element?.visitAvgSpeed ?? 0 > bestVisitAvgSpeed ? element?.visitAvgSpeed ?? 0 : bestVisitAvgSpeed;
    });
    visits = parseInt(visits / 12);
    visitors = parseInt(visitors / 12);
    visitAvgDuration = parseInt(visitAvgDuration / 12);
    visitAvgSpeed = parseInt(visitAvgSpeed / 12);
    return [{
        name: 'Monthly Avg. visits',
        numBest: numbFormat(bestVisits),
        number: numbFormat(visits),
        icn: <FontAwesomeIcon icon={faChartSimple} style={{fontSize: "1.3rem"}} />,
        bg: 'box-bg-686EFF ',
        bot: 'box-bdb-686EFF '
      },{
        name: 'Monthly Avg. visitors',
        numBest: numbFormat(bestVisitors),
        number: numbFormat(visitors),
        icn: <FontAwesomeIcon icon={faEye} style={{fontSize: "1.3rem"}}/>,
        bg: 'box-bg-FDB528 ',
        bot: 'box-bdb-FDB528 '
      },{
        name: 'Avg. Visit duration',
        numBest: bestVisitAvgDuration,
        number: visitAvgDuration+" (min)",
        icn: <FontAwesomeIcon icon={faClock} style={{fontSize: "1.4rem"}} />,
        bg: 'box-bg-FF4D49 ',
        bot: 'box-bdb-FF4D49 '
      },{
        name: 'Avg. speed (m/secs)',
        numBest: parseInt(bestVisitAvgSpeed),
        number: visitAvgSpeed,
        icn: <FontAwesomeIcon icon={faPersonRunning} style={{fontSize: "1.5rem"}} />,
        bg: 'box-bg-29C7F9 ',
        bot: 'box-bdb-29C7F9 '
    }]
}
export const initOptionStream = () => {
    return {
        monthNumber: 1,
        maxPartMonth: CSV_FILE_PART_OF_MONTH[1],
        chunkSize: 0,
        filesize: 0,
        lineCount: 0
    }
}
export const getOptionStream = (option, month) => {
    return {
        monthNumber: month,
        maxPartMonth: CSV_FILE_PART_OF_MONTH[month],
        chunkSize: option?.chunkSize ?? 0,
        filesize: option?.filesize ?? 0,
        lineCount: option?.lineCount ?? 0,
    }
}