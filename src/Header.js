import { FirebaseError } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile, storage, db } from './firebase';

function Header(props) {
    
    const [progress, setProgress] = useState(0); //useState que começa em 0
    
    const [file, setFile] = useState(null);
    
    useEffect(() => {
        
    }, [])
    
    function uploadPost(a){
        a.preventDefault();
        let legenda = document.getElementById('legenda').value;
        let progressPost = document.getElementById('progressPost');
    
        // storage.ref = criando referencia pra imagem que vai postar. faz o upload do (file) usando .put
        const uploadTask = storage.ref('images/${file.name}').put(file);
    
        uploadTask.on('state_changes', function(snapshot){
          const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
    
          setProgress(progress);
        }, function(error){
            alert('erro');
        }, function(){
            storage.ref('images').child(file.name).getDownloadURL().then(function(url){
                //pega a coleçao posts no bando de dados (db). se existir, vai inserir. se não, vai criar
                db.collection('posts').add({
                    legenda: legenda,
                    image: url,
                    username: props.user,
                    // timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
    
                setProgress(0);
                setFile(null);
    
                alert('upload realizado com sucesso!');
    
                document.getElementById('formUpload').reset();
            })
        })
    }
    
    function criarConta(a){
        a.preventDefault();
        
        let email = document.getElementById('email-cadastro').value;
        let username = document.getElementById('username-cadastro').value;
        let senha = document.getElementById('senha-cadastro').value;

        // alert('conta criada, ihu');
        createUserWithEmailAndPassword(auth,email,senha)
        .then((userCredential) => {
                console.log(userCredential);
                updateProfile(userCredential.user, {
                    displayName: username
                })
                alert('conta criada com sucesso');
                let modal = document.querySelector('.modalCreate');
                
                modal.style.display = "none";

                document.getElementById('email-cadastro').value = "";
                document.getElementById('username-cadastro').value = "";
                document.getElementById('senha-cadastro').value = "";
                
            }).catch((error) => {
                alert(error.message);
                console.log(error);
            });
    }

    function logar(a){
        const auth = getAuth();
        a.preventDefault();

        let email = document.getElementById('email-login').value;
        let senha = document.getElementById('senha-login').value;

        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            props.setUser(user.displayName);
            alert('logado com sucesso!');
        }).catch((erro) => {
            let {message, code} = erro;
            
            //aprendi de novo
            switch (code) {
                case "auth/user-not-found":
                    console.log("num achei ele :(");
                    break;
                case "auth/wrong-password":
                    console.log("n conheço essa senha :/ tenta dnv vai");
                    break;
                default:
                    console.log("num tendi uq acontseu >:(");
                    break;
            }
            console.log("Codigo do erro: " + code);
            // alert(erro.message);
            // console.log(erro.code);
        })
    }

    function abrirModalCreate(a){
        a.preventDefault();

        let modal = document.querySelector('.modalCreate');

        modal.style.display = "block";
    }

    function closeModalCreate(){
        let modal = document.querySelector('.modalCreate');

        modal.style.display = "none";
    }

    function criarModalUpload(a){
        a.preventDefault();

        let modal = document.querySelector('.modalUpload');

        modal.style.display = "block";
    }

    function closeModalUpload(){
        let modal = document.querySelector('.modalUpload');

        modal.style.display = "none";
    }


    return (

        <div className='app'>
            <div className='header'>

                <div className='modalCreate'>
                    <div className='formCreate'>
                        <div onClick={() => closeModalCreate()} className='close-modalCreate'>X</div>
                        <h2>Criar conta</h2>
                        <form onSubmit={(a) => criarConta(a)}>
                            <input id='email-cadastro' type="text" placeholder='E-mail'/>
                            <input id='username-cadastro' type="text" placeholder='Username'/>
                            <input id='senha-cadastro' type="password" placeholder='Senha'/>
                            <input type="submit" value="Criar"/>
                        </form>
                    </div>
                </div>

                <div className='modalUpload'>
                    <div className='formUpload'>
                        <div onClick={() => closeModalUpload()} className='close-modalCreate'>X</div>
                        <h2>Criar postagem</h2>
                        <form id='uploadPost' onSubmit={(a) => uploadPost(a)}>
                            <progress id='progressUpload' value={progress}></progress>
                            <input id='legenda' type="text" placeholder='Legenda'/>
                        {/* esse onChange e etc é pra pegar só o último arquivo. aparentemente vou usar muito isso! */}
                            <input onChange={(a) => setFile(a.target.files[0])} type='file' name='file'/>
                            <input type="submit" value="Postar"/>
                        </form>
                    </div>
                </div>

                <div className='center'>
                    <div className='headerLogo'>
                        <a href=""><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' /></a>
                    </div>

                    {
                        // isso pode ser testado mudando o useState(null) para qualquer coisa (entre `` ou "")
                        (props.user) ?
                            <div className='header_logado'>
                                olá {props.user} :)
                                <a onClick={(a) => criarModalUpload(a)} href='#'>postar</a>
                            </div>
                            :
                            <div className='headerLoginForm'>
                                <form onSubmit={(a) => logar(a)}>
                                    <input id='email-login' type='text' placeholder='email' />
                                    <input id='senha-login' type='password' placeholder='senha' />
                                    <input type='submit' placeholder='login' />
                                </form>
                                <div className='btn_criarConta'>
                                    <a onClick={(a) => abrirModalCreate(a)} href='#'>Criar conta</a>
                                </div>
                            </div>
                    }

                </div>
            </div>

        </div>

    )

}


export default Header;