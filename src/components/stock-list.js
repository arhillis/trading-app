import {useState, useEffect} from 'react';
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { useStockContext } from '../stock-context';
import finnHub from '../apis/finhub';

function StockList(){
    const context = useStockContext();
    const [symbols, setSymbols] = useState(['GOOGL', 'MSFT', 'AMZN']);
    const [stocks, setStocks] = useState(null);

    console.log(context);

    const changeColor = (val) =>{
        return val > 0 ? 'success' : 'danger';
    }

    const changeIcon = (val) =>{
        return val > 0 ? (<BsCaretUpFill />) : (<BsCaretDownFill />)
    }

    useEffect(() => {

        let isMounted = true;
        const fetchData = async () =>{
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
                if(isMounted){
                    setStocks(data)
                }                
            }catch(err){
                console.log(err)
            }
        }

        fetchData();

        return () =>{ isMounted = false};
    }, [])
    

    if(!stocks) return (<div>No stocks to show...</div>)
    return (<table className='table hover mt-5'>
        <thead>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Last</th>
                <th scope='col'>Chg</th>
                <th scope='col'>Chg%</th>
                <th scope='col'>High</th>
                <th scope='col'>Low</th>
                <th scope='col'>Open</th>
                <th scope='col'>Pclose</th>
            </tr>
        </thead>
        <tbody>
            {stocks.map(stock =>{
                const {symbol, data: {c, d, dp, h, l, o, pc}} = stock
                return (<tr key={symbol}>
                            <td>{symbol}</td>
                            <td>{c}</td>
                            <td className={`text-${changeColor(d)}`}>
                                {d}
                                {changeIcon(d)}
                            </td>
                            <td className={`text-${changeColor(dp)}`}>
                                {dp}
                                {changeIcon(dp)}
                            </td>
                            <td>{h}</td>
                            <td>{l}</td>
                            <td>{o}</td>
                            <td>{pc}</td>
                        </tr>);
            })}
            
        </tbody>
    </table>)
}

export default StockList;