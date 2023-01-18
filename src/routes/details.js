import { useEffect } from "react";
import { useParams } from "react-router";
import finhub from "../apis/finhub";

function Details(){
    const {symbol} = useParams();
    
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

    useEffect(() =>{
        const fetchData = async () =>{//
            try{
                const rightNow = new Date();

                const {endingStockDay, startingStockDay} = getStartEndDates(rightNow);
                
                const oneWeekAgo = getLastDay(rightNow, 7);
                const oneYearAgo = getLastDay(rightNow, 365);

                const oneDayRes = await finhub.get('/stock/candle',{
                    params: {
                        symbol: symbol,
                        resolution: '60',
                        from: getUTCString(startingStockDay),
                        to: getUTCString(endingStockDay)
                    }
                })

                const oneWeekRes = await finhub.get('/stock/candle',{
                    params: {
                        symbol: symbol,
                        resolution: 'D',
                        from: getUTCString(oneWeekAgo),
                        to: getUTCString(endingStockDay)
                    }
                })

                const oneYearRes = await finhub.get('/stock/candle',{
                    params: {
                        symbol: symbol,
                        resolution: 'M',
                        from: getUTCString(oneYearAgo),
                        to: getUTCString(endingStockDay)
                    }
                })

                console.log(oneDayRes);
                console.log(oneWeekRes);
                console.log(oneYearRes);

            }catch(err){console.log(err)}
        }

        fetchData();
    }, [])
    return (<div>
        <h2>Details: {symbol}</h2>
        <input type='date' />
    </div>)
}

export default Details;