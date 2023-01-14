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

                const getLastStockDay = date =>{
                    //date.getDay()
                    if(date.getDay() === 1)
                        return date;
                    return getDateString(getUTCString(date) - secsInADay);
                }

                const currentTime = getUTCString(rightNow);
                const oneDayAgo = currentTime - secsInADay;
                const yesterday = getDateString(oneDayAgo);
                
                //console.log(rightNow);
                //console.log(currentTime);
                console.log(yesterday);
                console.log(getLastStockDay(yesterday));
                //const currentDayOfTheWeek = rightNow.getDay();

                /**
                 * If the page is loaded on a Saturday or a Sunday, set the current day to the previous 
                 * Friday. Else, set it to the current day. Note: this program does not yet acount for
                 * bank holidays.
                 */
                // const oneDayAgo = currentDayOfTheWeek === 6 ? currentTime - 2 * secsInADay :
                //                 currentDayOfTheWeek === 0  ? currentTime - 3 * secsInADay : 
                //                 currentTime - secsInADay;

                
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