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

  const [user, setUser] = useState();

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(function(snapshot){
      setPosts(snapshot.docs.map(function(document){
        return {id:document.id,info:document.data()}
      }))
    })

  }, [])

  return (
    <div className="App">

      <Header setUser={setUser} user={user}></Header>

      {
        posts.map(function(val){

          return (
            <p>{val.info.legenda}</p>
          )

        })
      }

    </div>
  );
}

export default App;