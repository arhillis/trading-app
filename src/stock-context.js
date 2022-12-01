import React, { useContext} from "react"; 

const StockContext = React.createContext();

const StockProvider = ({children}) =>{
    return (<StockContext.Provider
        value={{
            string: 'Hello world'
        }}
    >
        {children}
    </StockContext.Provider>)

}

export {StockProvider}

export const useStockContext = () =>{
    return useContext(StockContext)
}