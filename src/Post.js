function Post(props){

    function comentar(id, e){
        e.preventDefault();
        alert('comentando no post ' +id);
    }

    return (
        <div className='postsLegImg'>
              <img key={props.id} src={props.info.image}/>
              <p key={props.id}>{props.info.username}: {props.info.legenda}</p>
              <form onSubmit={(e)=>comentar(props.id,e)}>
                <textarea></textarea>
                <input type="submit" value="Comentar"/>
              </form>
            </div>
    )

}


export default Post;