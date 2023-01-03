import { db } from './firebase.js';
import { useEffect, useState } from 'react';
import { doc, addDoc } from 'firebase/firestore';
import { collection, CollectionReference, getDocs, getDoc, orderBy, query } from 'firebase/firestore';

function Post(props){

  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {

    // programação antiga, que passei pra nova forma:
    // db.collection('posts').doc(props.id).collection('comentarios').onSnapshot(function(snapshot){
    //   setComentarios(snapshot.docs.map(function(document){
    //     return {id:document.id,info:document.data()}
    //   }))
    // })

    let comentRef = collection(db, 'posts', props.id, 'comentarios');
    let q = query(comentRef);

    getDocs(q).then((queryResult) => {
      setComentarios(queryResult.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          comentario: doc.data().comentario
        }
      }));
    });
    
  }, [])

  function comentar(id, e) {
    e.preventDefault();

    let comentarioAtual = document.querySelector('#comentario-' + id).value;

    let postRef = doc(db, 'posts', id);
    let comentariosRef = collection(postRef, 'comentarios');
    // let comentariosRef2 = collection(db, referenciaX, 'colecaoQueEuQuero');

    addDoc(comentariosRef, {
      name: props.user,
      comentario: comentarioAtual
    });

    //prog que quase deu certo
    // setDoc(doc(db, 'users/lunewaii/posts'), {
    //   name: 'rebs',
    //   comentario: comentarioAtual
    // });

    //prog versão antiga
    // db.collection('posts').doc(id).collection('comentarios').add({
    //   nome:'rebs',
    //   comentario: comentarioAtual
    // })

    //futuramente, vou substituir isso por um pop-up:
    alert('comentário feito com sucesso!');
    // alert(comentarioAtual);
    document.querySelector('#comentario-' + id).value = "";
  }

  return (
    <div className='postsLegImg'>
      <img src={props.info.image} />
      <p>{props.info.username}: {props.info.legenda}</p>

    <div className='coments'>
    {
      comentarios.map((val) => {
        return(
          <div key={val.id}>{val.name}: {val.comentario}</div>
        )
      })
    }
    </div>

      <form onSubmit={(e) => comentar(props.id, e)}>
        <textarea id={"comentario-" + props.id}></textarea>
        <input type="submit" value="Comentar" />
      </form>
    </div>
  )

}


export default Post;