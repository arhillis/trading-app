import { BsCaretUpFill, BsCaretDownFill, BsXLg } from "react-icons/bs";
import { useStockContext } from '../stock-context';

function StockList(){
    const {stocks, removeStock} = useStockContext();

    const changeColor = (val) =>{
        return val > 0 ? 'success' : 'danger';
    }

    const changeIcon = (val) =>{
        return val > 0 ? (<BsCaretUpFill />) : (<BsCaretDownFill />)
    }    

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
                            <td className="text-danger">
                                <BsXLg className="remove-stock"
                                    onClick={() => removeStock(symbol)}
                                />
                            </td>
                        </tr>);
            })}
            
        </tbody>
    </table>)
}

export default StockList;