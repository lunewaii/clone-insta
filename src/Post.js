import { db } from './firebase.js';
import { useEffect, useState } from 'react';
import { doc, collection, addDoc } from 'firebase/firestore';

function Post(props) {



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
      <img key={props.id} src={props.info.image} />
      <p key={props.id}>{props.info.username}: {props.info.legenda}</p>
      <form onSubmit={(e) => comentar(props.id, e)}>
        <textarea id={"comentario-" + props.id}></textarea>
        <input type="submit" value="Comentar" />
      </form>
    </div>
  )

}


export default Post;