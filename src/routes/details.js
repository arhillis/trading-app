import { useEffect } from "react";
import { useParams } from "react-router";
import finhub from "../apis/finhub";

function Details(){
    const {symbol} = useParams();

    useEffect(() =>{
        const fetchData = async () =>{//
            try{
                const date = new Date();

                const currentTime = Math.floor(date.getTime() / 1000) 
                const currentDayOfTheWeek = date.getDay();
                const secsInADay = 24 * 60 * 60;

                /**
                 * If the page is loaded on a Saturday or a Sunday, set the current day to the previous 
                 * Friday. Else, set it to the current day. Note: this program does not yet acount for
                 * bank holidays.
                 */
                const oneDayAgo = currentDayOfTheWeek === 6 ? currentTime - 2 * secsInADay :
                                currentDayOfTheWeek === 0  ? currentTime - 3 * secsInADay : 
                                currentTime - secsInADay;

                const oneWeekAgo = currentTime - 7 * secsInADay;
                const oneYearAgo = currentTime - 365 * secsInADay;

                const res = await finhub.get('/stock/candle',{
                    params: {
                        symbol: symbol,
                        resolution: '60',
                        from: oneDayAgo,
                        to: currentTime
                    }
                })

                console.log(res)

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