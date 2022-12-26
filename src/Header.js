import { FirebaseError } from 'firebase/app';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, CollectionReference, doc, Firestore, setDoc } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { getFirestore, Timestamp, serverTimestamp } from 'firebase/firestore';
import { auth, createUserWithEmailAndPassword, updateProfile, storage, db } from './firebase';
import 'firebase/storage';

function Header(props) {

    useEffect(() => {

    }, [])

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0); //useState que começa em 0

    const formHandler = (a) => {
        a.preventDefault();
        console.log(a);
        // let file = a.target[1].file[0];
        uploadFiles(file);
    };

    const uploadFiles = (file) => {
        let legenda = document.getElementById('legenda').value;
        const storageRef = ref(storage, `files/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
        // .then((snapshot) => {

        //     // console.log(snapshot);
        //     const prog =  Math.round(
        //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        //     setProgress(prog);

        // }).catch((ex) => {
        //     console.log(ex);
        // }).finally(() => {
        //     getDownloadURL(storageRef).then((url) => {
        //         console.log(url);
        //     });
        // });

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(storageRef).then((url) => {
                    console.log(url);
                    // novo
                    let docRef = doc(collection(db, "posts"));
                    let modal = document.querySelector('.modalUpload');

                    modal.style.display = "none";
                    console.log(docRef);
                    setDoc(docRef, {
                        legenda: legenda,
                        image: url,
                        username: props.user,
                        timestamp: serverTimestamp()
                    }).then(() => {
                        console.log("executado");
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            }
        )
    }

    function criarConta(a) {
        a.preventDefault();

        let email = document.getElementById('email-cadastro').value;
        let username = document.getElementById('username-cadastro').value;
        let senha = document.getElementById('senha-cadastro').value;

        // alert('conta criada, ihu');
        createUserWithEmailAndPassword(auth, email, senha)
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

    function logar(a) {
        const auth = getAuth();
        a.preventDefault();

        let email = document.getElementById('email-login').value;
        let senha = document.getElementById('senha-login').value;

        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                props.setUser(user.displayName);
                alert('logado com sucesso!');
                window.location.href = "/";
            }).catch((erro) => {
                let { message, code } = erro;

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

    function deslogar(a) {
        a.preventDefault();
        auth.signOut().then(function (val) {
            props.setUser(null);
            window.location.href = "/";
        })
    }

    function abrirModalCreate(a) {
        a.preventDefault();

        let modal = document.querySelector('.modalCreate');

        modal.style.display = "block";
    }

    function closeModalCreate() {
        let modal = document.querySelector('.modalCreate');

        modal.style.display = "none";
    }

    function criarModalUpload(a) {
        a.preventDefault();

        let modal = document.querySelector('.modalUpload');

        modal.style.display = "block";
    }

    function closeModalUpload() {
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
                            <input id='email-cadastro' type="text" placeholder='E-mail' />
                            <input id='username-cadastro' type="text" placeholder='Username' />
                            <input id='senha-cadastro' type="password" placeholder='Senha' />
                            <input type="submit" value="Criar" />
                        </form>
                    </div>
                </div>

                <div className='modalUpload'>
                    <div className='formUpload'>
                        <div onClick={() => closeModalUpload()} className='close-modalCreate'>X</div>
                        <h2>Criar postagem</h2>
                        <form onSubmit={formHandler}>
                            <progress id='progressUpload' value={progress}></progress>
                            <input id='legenda' type="text" placeholder='Legenda' />
                            {/* esse onChange e etc é pra pegar só o último arquivo. aparentemente vou usar muito isso! */}
                            <input onChange={(a) => setFile(a.target.files[0])} type='file' name='file' />
                            <input type="submit" value="Postar" />
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
                                <a onClick={(a) => deslogar(a)} href='#'>deslogar</a>
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