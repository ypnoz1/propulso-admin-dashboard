import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faClock, faPersonRunning, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const numbFormat = (nb) => Number.isNaN(nb) ? 0 : new Intl.NumberFormat().format(nb);

export const formatModalData = (data, startTimer) => {              
    const endTimer = Date.now();
    const timer = (endTimer - startTimer) / 1000;
    return {
        lineCount: data.entriesCount,
        fileSize:  data.sizeStream,
        chunkSize: data.chunkSize,
        perc: parseInt((parseInt(data.chunkSize) / parseInt(data.sizeStream)) * 100),
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

export const processCsvData = (statsResult) => {
    const json = JSON.parse(statsResult);
    const secsToMin = parseInt((json?.visitAverageDuration ?? 0) / 60);
    const formattedData = {
        monthlyAvgVisit: json?.monthlyAvgVisit ?? 0,
        monthlyAvgVisitor: json?.monthlyAvgVisitor ?? 0,
        visitAverageDuration: secsToMin,
        visitAverageSpeed: json?.visitAverageSpeed ?? 0,
        noVisitDayAverage: json?.noVisitDayAverage ?? 0,
        monthlyDurationRecord: json?.monthlyDurationRecord ?? [],
        monthlySpeedRecord: json?.monthlySpeedRecord ?? [],
        monthlyVisitRecord: json?.monthlyVisitRecord ?? [],
        monthlyVisitorRecord: json?.monthlyVisitorRecord ?? []
    };
    return formattedData;
}

export const setDataBoxSmDashBoard = (data) => {
    const noVisitDayAverage = data.noVisitDayAverage;
    const monthlyAvgVisitor = data.monthlyAvgVisitor;
    const visitAverageDuration = data.visitAverageDuration;
    const visitAverageSpeed = data.visitAverageSpeed;

    const monthlyVisitorBest = Math.max.apply(Math, data.monthlyVisitorRecord);
    const visitDurationBest = Math.max.apply(Math, data.monthlyDurationRecord);
    const visitSpeedBest = Math.max.apply(Math, data.monthlySpeedRecord);

    return [{
        name: 'Monthly Avg. visitors',
        numBest: `Best: ${numbFormat(parseInt(monthlyVisitorBest))}`,
        number: numbFormat(monthlyAvgVisitor),
        icn: <FontAwesomeIcon icon={faChartSimple} style={{fontSize: "1.3rem"}} />,
        bg: 'box-bg-686EFF ',
        bot: 'box-bdb-686EFF '
      },{
        name: 'Avg. days between visits',
        numBest: '',
        number: numbFormat(noVisitDayAverage),
        icn: <FontAwesomeIcon icon={faEyeSlash} style={{fontSize: "1.3rem"}}/>,
        bg: 'box-bg-FDB528 ',
        bot: 'box-bdb-FDB528 '
      },{
        name: 'Avg. Visit duration',
        numBest: `Best: ${visitDurationBest.toFixed(2)}`,
        number: visitAverageDuration+" (min)",
        icn: <FontAwesomeIcon icon={faClock} style={{fontSize: "1.4rem"}} />,
        bg: 'box-bg-FF4D49 ',
        bot: 'box-bdb-FF4D49 '
      },{
        name: 'Avg. speed (m/secs)',
        numBest: `Best: ${visitSpeedBest.toFixed(2)}`,
        number: visitAverageSpeed.toFixed(2),
        icn: <FontAwesomeIcon icon={faPersonRunning} style={{fontSize: "1.5rem"}} />,
        bg: 'box-bg-29C7F9 ',
        bot: 'box-bdb-29C7F9 '
    }]
}