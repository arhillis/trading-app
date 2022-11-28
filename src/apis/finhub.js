import axios from 'axios';

// export const fetchQuote = (fn) =>{
//         return fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=cdue3rqad3ib3oqtedggcdue3rqad3ib3oqtedh0`)
//          .then(res => res.json())
//          .then(data => fn(data))
//     }

const TOKEN = 'cdue3rqad3ib3oqtedggcdue3rqad3ib3oqtedh0';

export default axios.create({
        baseURL: 'https://finnhub.io/api/v1',
        params: {
                token: TOKEN
        }
})

