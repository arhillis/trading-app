import {useState, useEffect} from 'react';
import finnHub from '../apis/finhub';

function SearchBar(){
    const [searchTerm, setSearchTerm] = useState("");
    const [searchList, setSearchList] = useState([])

    const handleChange = (e) =>{
        setSearchTerm(e.target.value)
    }

    const handleClick = (stock) =>{
        console.log(stock);

    }

    useEffect(() =>{
        if(searchTerm !== ""){
            const fetchSearch = async () =>{
                const results = await finnHub.get
                                    ("/search", {
                                        params: {
                                            q: searchTerm
                                        }
                                    })
                setSearchList(results.data.result)
            }

            fetchSearch();
        }else{
            setSearchList([])
        }      
    }, [searchTerm])

    return (<div className="w-50 p-5 rounded mx-auto">
                <div className="form-floating dropdown">
                    <input  id="searchbar"
                            className="form-control" 
                            type="text"
                            name='searchTerm'
                            value={searchTerm}
                            placeholder="Search..." 
                            aria-label="searchbar"
                            autoComplete="off"
                            onChange={handleChange}
                    ></input>
                    <label htmlFor="searchbar">Search</label>
                    {
                        searchList.length > 0 ?
                            (<ul className="dropdown-menu show">
                                {searchList.map((stock, index)=>(
                                    <li key={stock.symbol}
                                        onClick={() => handleClick(stock)}
                                    >
                                        {stock.description} ({stock.symbol})
                                    </li>
                                ))}
                            </ul>) : 
                            null
                    }
                    
                </div>
            </div>)
}

export default SearchBar;