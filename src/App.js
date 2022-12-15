import React, { useState, useEffect } from 'react';

import './App.css';
import Header from './Header';
import { db } from './firebase';
import userEvent from '@testing-library/user-event';

import { collection, CollectionReference, getDocs, orderBy, query } from 'firebase/firestore';

function App() {

  //var [numero, setNumero] = useState(0);

  // useEffect(()=>{ //toda vez que o que estiver entre [] for alterado, vai fazer o que tiver dentro
  //   console.log(numero);
  // },[numero]);

  const [user, setUser] = useState();

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    let postRef = collection(db, 'posts');
    let q = query(postRef, orderBy('timestamp', 'desc'));

    getDocs(q).then((docs) => {
      setPosts(docs.docs.map((doc) => {
        return {
          id: doc.id,
          info: doc.data()
        };
      }));
    }).catch((ex) => {
      console.log(ex);
    }).finally(() => {
      console.log("executou");
    });

  }, [ ]);

  return (
    <div className="App">

      <Header setUser={setUser} user={user}></Header>

      {
        posts.map(function(val){

          return (
            <div className='postsLegImg'>
              <img key={val.id} src={val.info.image}/>
              <p key={val.id}>{val.info.legenda}</p>
            </div>
          )

        })
      }

    </div>
  );
}

export default App;