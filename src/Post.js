import {db} from './firebase.js';
import { useEffect, useState } from 'react';


function Post(props){

    function comentar(id, e){
        e.preventDefault();
        //futuramente, vou substituir isso por um pop-up:
        alert('comentário feito com sucesso!');
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