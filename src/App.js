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
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KU73TSCeqXrJflUSjBK6VcghX7KomDVBHFXnUyjQ3jF8L6w5SIKRfAl7YcVFt0cpLrOWoPyR1AePXMvWE1Azo4r00V8uSVCHg');

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
          <Route path='/payment' 
              element={
              <>
                  <Header/>
                  <Elements stripe={promise}>
                    <Payment/>
                  </Elements>
              </>
              }
          />



      </Routes>
         </div>
    </BrowserRouter> 
  );
}

export default App;
