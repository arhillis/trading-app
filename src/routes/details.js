import { useEffect, useState } from "react";
import { useParams } from "react-router";
import finhub from "../apis/finhub";

import DetailsChart from "../components/details-chart";

function Details(){
    const {symbol} = useParams();
    const [stockData, setStockData] = useState(null);
    const [timeInterval, setTimeInterval] = useState('oneDay');
    
    //24 hours in a day, 60 minutes in an hour, and 60 seconds in a minutes
    const secsInADay = 24 * 60 * 60;
                
    //Convert a regular date to a UTC string that can be used to fetch data
    const getUTCString = date => Math.floor(date.getTime() / 1000); 

    //Covert a UTC date string back into a regular date to be used for getting the day of the week
    const getDateString = date => new Date(date * 1000);
    
    const getLastDay = (date, numDays = 1 )=> getDateString(getUTCString(date) - (secsInADay * numDays));

    const getStartEndDates = currentDate =>{
        const getLastStockDay = date =>{
                    const dayOfTheWeek = date.getDay();
                    const dayOfTheMonth = date.getDate();                
                    const currentMonth = date.getMonth();

                    const BANK_HOLIDAYS = {
                        0: [16],
                        1: [20],
                        3: [7],
                        4: [29],
                        6: [3, 4],
                        8: [4],
                        10: [23, 24],
                        11: [25]
                    }                    

                    //If it's Saturday, Sunday, or a bank holiday, recrusively call the function again. Else, return the current date
                    if(dayOfTheWeek === 0 || dayOfTheWeek === 6 || 
                        (BANK_HOLIDAYS.hasOwnProperty(currentMonth) && 
                            BANK_HOLIDAYS[currentMonth].find(day => day === dayOfTheMonth))
                    )
                        return getLastStockDay(getLastDay(date));                    
                    return date;
                }

                const endingStockDay = getLastStockDay(currentDate);
                const startingStockDay = getLastStockDay(getLastDay(endingStockDay));

                return {
                    endingStockDay, 
                    startingStockDay
                }
    };

    const formatData = arr =>{
        const {c, h, l, o, t, v} = arr;

        return t.map((val, index) =>{
                    return {
                        x: val * 1000,
                        y: Math.floor(c[index])
                    }
                })
    }

    useEffect(() =>{
        const fetchData = async () =>{//
            try{
                const rightNow = new Date();

                const {endingStockDay, startingStockDay} = getStartEndDates(rightNow);
                
                const oneWeekAgo = getLastDay(rightNow, 7);
                const oneYearAgo = getLastDay(rightNow, 365);

                const responses = await Promise.all([
                    finhub.get('/stock/candle',{
                        params: {
                            symbol: symbol,
                            resolution: '60',
                            from: getUTCString(startingStockDay),
                            to: getUTCString(endingStockDay)
                        }
                    }),
                    finhub.get('/stock/candle',{
                        params: {
                            symbol: symbol,
                            resolution: 'D',
                            from: getUTCString(oneWeekAgo),
                            to: getUTCString(endingStockDay)
                        }
                    }),
                    finhub.get('/stock/candle',{
                        params: {
                            symbol: symbol,
                            resolution: 'M',
                            from: getUTCString(oneYearAgo),
                            to: getUTCString(endingStockDay)
                        }
                    })
                ])

                const [oneDayRes, oneWeekRes, oneYearRes] = responses.map(res => res.data);

                setStockData({
                    oneDay: formatData(oneDayRes),
                    oneWeek: formatData(oneWeekRes),
                    oneYear: formatData(oneYearRes)
                })

            }catch(err){console.log(err)}
        }

        fetchData();
    }, []);

    return (<div>
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" 
                    className={timeInterval === 'oneDay' 
                        ? "btn btn-primary btn-sm active" : 
                        "btn btn-outline-primary btn-sm"}
                    onClick={() => setTimeInterval('oneDay')}
            >
                One Day
            </button>
            <button type="button" 
                    className={timeInterval === 'oneWeek' 
                        ? "btn btn-primary btn-sm active" : 
                        "btn btn-outline-primary btn-sm"}
                    onClick={() => setTimeInterval('oneWeek')}
            >
                One Week
            </button>
            <button type="button" 
                    className={timeInterval === 'oneYear' 
                        ? "btn btn-primary btn-sm active" : 
                        "btn btn-outline-primary btn-sm"}
                    onClick={() => setTimeInterval('oneYear')}
            >
                One Year
            </button>
        </div>
        {stockData ? (
            <DetailsChart stockData={stockData[timeInterval]} symbol={symbol}/>
        ) : (
            <div>No data to show...</div>
        )}
        
    </div>)
}

export default Details;