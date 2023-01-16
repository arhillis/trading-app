import { useEffect } from "react";
import { useParams } from "react-router";
import finhub from "../apis/finhub";

function Details(){
    const {symbol} = useParams();

    useEffect(() =>{
        const fetchData = async () =>{//
            try{
                const rightNow = new Date();

                //24 hours in a day, 60 minutes in an hour, and 60 seconds in a minutes
                const secsInADay = 24 * 60 * 60;
                
                //Convert a regular date to a UTC string that can be used to fetch data
                const getUTCString = date => Math.floor(date.getTime() / 1000); 

                //Covert a UTC date string back into a regular date to be used for getting the day of the week
                const getDateString = date => new Date(date * 1000);

                const getLastDay = date => getDateString(getUTCString(date) - secsInADay);

                const getLastStockDay = date =>{
                    const dayOfTheWeek = date.getDay();
                    const dayOfTheMonth = date.getDate();                
                    const currentMonth = date.getMonth();

                    const BANK_HOLIDAYS = {
                        0: [16]
                    }                    

                    //If it's Saturday, Sunday, or a bank holiday, recrusively call the function again. Else, return the current date
                    if(dayOfTheWeek === 0 || dayOfTheWeek === 6 || 
                        (BANK_HOLIDAYS.hasOwnProperty(currentMonth) && 
                            BANK_HOLIDAYS[currentMonth].find(day => day === dayOfTheMonth))
                    )
                        return getLastStockDay(getLastDay(date));                    
                    return date;
                }

                const currentTime = getUTCString(rightNow);
                const oneDayAgo = currentTime - secsInADay;
                const yesterday = getDateString(oneDayAgo);
                
                console.log(getLastStockDay(rightNow));

                
                //console.log((getDateString(currentTime)).getDay());
                
                // const oneWeekAgo = currentTime - 7 * secsInADay;
                // const oneYearAgo = currentTime - 365 * secsInADay;

                // const res = await finhub.get('/stock/candle',{
                //     params: {
                //         symbol: symbol,
                //         resolution: '60',
                //         from: oneDayAgo,
                //         to: currentTime
                //     }
                // })

                // console.log(res)

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