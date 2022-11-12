import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import { db } from './firebase';
import userEvent from '@testing-library/user-event';

function App() {

  //var [numero, setNumero] = useState(0);

  // useEffect(()=>{ //toda vez que o que estiver entre [] for alterado, vai fazer o que tiver dentro
  //   console.log(numero);
  // },[numero]);

  const [userEvent, setUser] = useState(null);

  useEffect(()=>{
    console.log(db);
  },[])

  return (
    <div className="App">
  
      <div className='app'>
        <div className='header'>

          <div className='headerLogo'>
            <a href=''><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'/></a>
          </div>

          <div className='headerLoginForm'>
            <form>
              <input type='text' placeholder='telefone, nome de usuário ou email'/>
              <input type='password' placeholder='senha'/>
              <input type='submit' placeholder='login'/>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;