import React, { useContext, useEffect, useState} from "react"; 
import finnHub from './apis/finhub';

const StockContext = React.createContext();

const StockProvider = ({children}) =>{
    const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);
    const [stocks, setStocks] = useState(null);

    const addStock = (symbol) =>{
        if(!watchList.find(sym => sym === symbol))
            setWatchList([...watchList, symbol])
    }

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

    useEffect(() =>{fetchStocks(watchList)}, [watchList])

    return (<StockContext.Provider
        value={{
            stocks,
            addStock
        }}
    >
        {children}
    </StockContext.Provider>)

}

export {StockProvider}

export const useStockContext = () =>{
    return useContext(StockContext)
}