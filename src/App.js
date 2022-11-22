import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Overview from './routes/overview';
import Details from './routes/details';

import Header from './components/header';

function App() {
  return (<div className='container'>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Overview />} />
              <Route path='/details/:symbol' element={<Details />} />
            </Routes>
          </BrowserRouter>
          </div>);
}

export default App;