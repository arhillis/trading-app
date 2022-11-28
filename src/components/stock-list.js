import {useState, useEffect} from 'react';
import finnHub from '../apis/finhub';
//import {fetchQuote} from '../apis/finhub';
//https://finnhub.io/api/v1/quote

function StockList(){
    const [stocks, setStocks] = useState(['GOOGL', 'MSFT', 'AMZN']);
    const [quote, setQuote] = useState(null)



    useEffect(() => {
        let isMounted = true;
        const fetchData = async () =>{
            try{
                const response1 = await finnHub.get('/quote', {
                    params:{
                        symbol: 'AAPL'
                    }
                });

                const response2 = await finnHub.get('/quote', {
                    params:{
                        symbol: 'GOOGL'
                    }
                });

                const response3 = await finnHub.get('/quote', {
                    params:{
                        symbol: 'GOOGL'
                    }
                });

                Promise.all([response1, response2, response3])
                    .then(values => console.log(values))

                if(isMounted){
                    setQuote(response1.data);
                }                
            }catch(err){
                console.log(err)
            }
        }

        fetchData();

        return () =>{ isMounted = false};
    }, [])

    return (<div>Stock list goes here...</div>)
}

export default StockList;