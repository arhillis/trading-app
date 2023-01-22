import React, {useEffect, useState} from 'react';
import finhub from "../apis/finhub";

function StockInfo({symbol}) {
    const [stockInfo, setStockInfo] = useState(null);

    useEffect(() =>{
        try{
            const fetchData = async () =>{
                const res = await finhub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })

                setStockInfo(res.data)
            }

            fetchData();
        }
        catch(err){
            console.log(err);
        }
    }, [symbol])

    console.log(stockInfo)
  if(!stockInfo)
    return null

    const {name, country, ticker, exchange, finnhubIndustry, ipo, weburl, logo} = stockInfo;
    return (<div className='card p-3'>
        <h2><img src={logo} alt={name} width='50'/>{name}</h2>
        
        <div className="row">
            {/* <div className="col-6">
                <span className="fw-bold">
                    Name: &nbsp;
                </span>
                
            </div> */}
            <div className="col-6">
                <span className="fw-bold">
                    Country: &nbsp;
                </span>
                {country}
            </div>
            <div className="col-6">                
                <span className="fw-bold">
                    Ticker: &nbsp;
                </span>
                {ticker}
            </div>
            <div className="col-6">
                <span className="fw-bold">
                    Exchange: &nbsp;
                </span>
                {exchange}
            </div>
            <div className="col-6">
                <span className="fw-bold">
                    Industry: &nbsp;
                </span>
                {finnhubIndustry}
            </div>
            <div className="col-6">
                <span className="fw-bold">
                    IPO: &nbsp;
                </span>
                {ipo}
            </div>
            <div className="col-6">
                <a href={weburl}>website</a>
            </div>
        </div>
    </div>)
}

export default StockInfo