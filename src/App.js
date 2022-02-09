import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter,Routes,Route,} from "react-router-dom";
// Just Use Routes instead of "Switch"
import Checkout from './Checkout';

function App() {
  return (
    //BEM
    <BrowserRouter>
    <div className="app">
     <Header/>
      <Routes>
        {/*  <Route path='/' 
          element={<><Header/><Home/></>} />
          this is to use two elements inside element */}
          <Route path='/login' element={<h1>login page</h1>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/checkout' element={<Checkout/>}/>


      </Routes>
         </div>
    </BrowserRouter> 
  );
}

export default App;
