import {db} from './firebase.js';
import { useEffect, useState } from 'react';


function Post(props){

    function comentar(id, e){
        e.preventDefault();

        let comentarioAtual = document.querySelector('#comentario-'+id).value;
        //futuramente, vou substituir isso por um pop-up:
        alert('comentário feito com sucesso!');
        alert(comentarioAtual);
    }

    return (
        <div className='postsLegImg'>
              <img key={props.id} src={props.info.image}/>
              <p key={props.id}>{props.info.username}: {props.info.legenda}</p>
              <form onSubmit={(e)=>comentar(props.id,e)}>
                <textarea id={"comentario-"+props.id}></textarea>
                <input type="submit" value="Comentar"/>
              </form>
            </div>
    )

}


export default Post;