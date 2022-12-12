import { useEffect } from "react";
import { useParams } from "react-router";
import finhub from "../apis/finhub";

function Details(){
    const {symbol} = useParams();

    useEffect(() =>{
        const fetchData = async () =>{//
            try{

                const DAYS_OF_THE_WEEK = {
                    0: 'Sunday',
                    1: 'Monday', 
                    2: 'Tuesday',
                    3: 'Wednesday'
                }

                const date = new Date();

                const currentTime = Math.floor(date.getTime() / 1000) 
                const currentDayOfTheWeek = date.getDay();
                
                //console.log(currentTime);

                let oneDayAgo;

                if(currentDayOfTheWeek === 6)
                    oneDayAgo = currentTime - 2 * 24 * 60 * 60;
                else if(currentDayOfTheWeek === 0)
                    oneDayAgo = currentTime - 3 * 24 * 60 * 60;
                else oneDayAgo = currentTime - 24 * 60 * 60;

                // const secsInADay = 24 * 60 * 60* 1000;      


                // /**
                //  * If the page is loaded on a Saturday or a Sunday, set the current day to the previous 
                //  * Friday. Else, set it to the current day. Note: this program does not yet acount for
                //  * bank holidays.
                //  */
                // const  currentDay = currentDayOfTheWeek === 6 ? new Date(date - 3 * secsInADay) :
                //                   currentDayOfTheWeek === 0 ? new Date(date - 2 * secsInADay) : date;  

                // //Subtract three days if it is a Monday to get to the previous Friday.
                // const previousDay = currentDay.getDay() === 1 ? new Date(currentDay - secsInADay * 3) : new Date(currentDay - secsInADay);

                
                // console.log(previousDay);

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