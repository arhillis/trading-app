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

    const removeStock = (symbol) => {
        setWatchList(watchList.filter(sym => sym !== symbol));
    }

    const sortStockList = (prop, direction) =>{
        const sortedStocks = stocks.sort((a, b) =>{
            return a[prop] < b[prop] ? direction : direction * -1;
        })
        setStocks([...sortedStocks])
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
                        ...response.data
                    }
            })

            setStocks(data);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{fetchStocks(watchList)}, [watchList]);

    return (<StockContext.Provider
        value={{
            stocks,
            addStock,
            removeStock,
            sortStockList
        }}
    >
        {children}
    </StockContext.Provider>)

}

export {StockProvider}

export const useStockContext = () =>{
    return useContext(StockContext)
}