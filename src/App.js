import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import { db } from './firebase';

function App() {

  var [numero, setNumero] = useState(0);

  // useEffect(()=>{ //toda vez que o que estiver entre [] for alterado, vai fazer o que tiver dentro
  //   console.log(numero);
  // },[numero]);

  // function soma(){
  //   setNumero(13);
  // }

  function soma() {
    setNumero(numero+1);
  }

  return (
    <div className="App">
      
      {/* <button onClick={() => soma()}>
        Click me
      </button> */}
      <p>
        You clicked {numero} times
      </p>
      <button onClick={() => soma()}>
        Click me
      </button>
    </div>
  );
}

export default App;