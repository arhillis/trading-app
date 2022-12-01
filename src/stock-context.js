import React, { useContext, useEffect, useState} from "react"; 
import finnHub from './apis/finhub';

const StockContext = React.createContext();

const StockProvider = ({children}) =>{
    const DEFAULT_SYMBOLS = ['GOOGL', 'MSFT', 'AMZN'];
    const [stocks, setStocks] = useState(null);

    const fetchStocks = async (symbols) =>{
        try{
            const responses = await Promise.all(symbols.map(symbol =>{
                    return finnHub.get('/quote', {
                        params: {
                            symbol: symbol
                        }
                    })
            }))

            const data = responses.map(response =>{
                    return {
                        symbol: response.config.params.symbol,
                        data: response.data
                    }
            })

            setStocks(data);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{ fetchStocks(DEFAULT_SYMBOLS)}, [])

    return (<StockContext.Provider
        value={{
            stocks,
            setStocks
        }}
    >
        {children}
    </StockContext.Provider>)

}

export {StockProvider}

export const useStockContext = () =>{
    return useContext(StockContext)
}