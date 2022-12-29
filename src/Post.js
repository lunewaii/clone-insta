import { db } from './firebase.js';
import { useEffect, useState } from 'react';
import { doc, collection, addDoc } from 'firebase/firestore';

function Post(props) {

  const [comentarios, setComentarios] = useState(null);

  useEffect( () => {

    db.collection('posts').doc(props.id).collection('comentarios').onSnapshot(function(snapshot){
      setComentarios(snapshot.docs.map(function(document){
        return {id:document.id,info:document.data()}
      }))
    })

    // let comentRef = doc(db, 'posts', id);
    // let q = query(comentRef, collection(comentRef, 'comentarios'));

    // getDocs(q).then((docs) => {
    //   setComentarios(docs.docs.map((doc) => {
    //     return {
    //       id: doc.id,
    //       info: doc.data()
    //     };
    //   }));
    // }).catch((ex) => {
    //   console.log(ex);
    // }).finally(() => {
    //   console.log("executou");
    // });

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