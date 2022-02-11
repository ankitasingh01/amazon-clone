import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter,Routes,Route,} from "react-router-dom";
// Just Use Routes instead of "Switch"
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from './StateProvider';
import { type } from '@testing-library/user-event/dist/type';


function App() {

  const [{basket},dispatch] = useStateValue();

  useEffect(()=>{
    //will only run once when the app components loads
    //as we have kept brackets empty
    auth.onAuthStateChanged(authUser =>{
      console.log('The User is  ',authUser);
      if(authUser){
        //the user just logged in / the user was logged in
        
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
        

      }
    })

  },[])
  return (
    //BEM
    <BrowserRouter>
    <div className="app">
     {/* <Header/> */}
      <Routes>
        {/*  <Route path='/' 
          element={<><Header/><Home/></>} />
          this is to use two elements inside element */}
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<><Header/><Home/></>} />
          <Route path='/checkout' element={<><Header/><Checkout/></>}/>


      </Routes>
         </div>
    </BrowserRouter> 
  );
}

export default App;
