import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, updateProfile } from './firebase';

function Header(props) {

    useEffect(() => {
        
    }, [])

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

                <div className='center'>
                    <div className='headerLogo'>
                        <a href=""><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' /></a>
                    </div>

                    {
                        // isso pode ser testado mudando o useState(null) para qualquer coisa (entre `` ou "")
                        (props.user) ?
                            <div className='header_logado'>
                                olá {props.user} :)
                                <a href='#'>postar</a>
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