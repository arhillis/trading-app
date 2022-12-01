import { BsCaretUpFill, BsCaretDownFill, BsXLg, BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import { useStockContext } from '../stock-context';

function StockList(){
    const {stocks, removeStock, sortStockList} = useStockContext();

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
                <th scope='col'>Name 
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('symbol', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('symbol', 1)} />
                </th>
                <th scope='col'>Last
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('c', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('c', 1)} />
                </th>
                <th scope='col'>Chg
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('d', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('d', 1)} />
                </th>
                <th scope='col'>Chg%
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('dp', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('dp', 1)} />
                </th>
                <th scope='col'>High
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('h', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('h', 1)} />
                </th>
                <th scope='col'>Low
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('l', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('l', 1)} />                   
                </th>
                <th scope='col'>Open
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('o', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('o', 1)} />
                </th>
                <th scope='col'>Pclose
                    <BsArrowDownCircleFill className='sort-stocks' onClick={() => sortStockList('pc', -1)} />
                    <BsArrowUpCircleFill className='sort-stocks' onClick={() => sortStockList('pc', 1)} />
                </th>
            </tr>
        </thead>
        <tbody>
            {stocks.map(stock =>{
                const {symbol, c, d, dp, h, l, o, pc} = stock
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