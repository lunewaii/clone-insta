import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { db } from './firebase';
import userEvent from '@testing-library/user-event';

function App() {

  //var [numero, setNumero] = useState(0);

  // useEffect(()=>{ //toda vez que o que estiver entre [] for alterado, vai fazer o que tiver dentro
  //   console.log(numero);
  // },[numero]);

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;