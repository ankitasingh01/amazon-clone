import React, { useState } from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom';
//we cannot use useHistory that is outdated command
import {auth} from './firebase';

function Login() {
    let navigate = useNavigate();
    //we cannot use useHistory that is outdated command
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = e => {
         e.preventDefault();

         auth
            .signInWithEmailAndPassword(email,password)
            .then(auth=>{
                navigate('/');
            })
            .catch(error=>alert(error.message))
         
       //some fancy firebase login shitttt....  
    }

    const register = e => {
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth) => {
//            console.log(auth);
               //if successfully created email and password 
              if(auth){
                  navigate('/');
                  //
              }

        })
        .catch(error => alert(error.message))

        // do some fancy firebase register shittt...
    }

  return (
    <div className='login'>
        <Link to='/'>
            <img 
                className='login__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
            />
        </Link>
        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} 
                  onChange={e=>setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} 
                  onChange={e=>setPassword(e.target.value)}/>

                <button type='submit' onClick={signIn} 
                  className='login__signInButton'>Sign In</button>
            </form>
            <p>
                By signing-in you agree to the AMAZON FAKE CLONE
                Conditions of use & Sale. Please see our Privacy Notice
                and our Internet Based Ads Notice
            </p>
            <button  onClick={register}
              className='login__registerButton'>
                Create your Amazon Account
            </button>
        </div>
    </div>
  )
}

export default Login