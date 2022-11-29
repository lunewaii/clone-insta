import React, { useState, useEffect } from 'react';

import './App.css';
import Header from './Header';
import { db } from './firebase';
import userEvent from '@testing-library/user-event';

function App() {

  //var [numero, setNumero] = useState(0);

  // useEffect(()=>{ //toda vez que o que estiver entre [] for alterado, vai fazer o que tiver dentro
  //   console.log(numero);
  // },[numero]);

  const [user, setUser] = useState(`Rebeca`);

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>
    </div>
  );
}

export default App;