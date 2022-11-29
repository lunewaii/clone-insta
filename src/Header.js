import React, { useState, useEffect } from 'react';
import {auth} from './firebase';

function Header(props) {

    useEffect(() => {
        props.setUser('');
    }, [])

    function criarConta(a){
        a.preventDefault();

        let email = document.getElementById('email-cadastro').value;
        let username = document.getElementById('username-cadastro').value;
        let senha = document.getElementById('senha-cadastro').value;

        // alert('conta criada, ihu');
        auth.createUserWithEmailAndPassword(email,senha).then((authUser) => {
            authUser.user.updateProfile({
                displayName:username
            })
            alert('conta criada com sucesso');
            let modal = document.querySelector('.modalCreate');

            modal.style.display = "none";
        }).catch((error) => {
            alert(error.message);
        });
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
                        <a href=''><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' /></a>
                    </div>

                    {
                        // isso pode ser testado mudando o useState(null) para qualquer coisa (entre `` ou "")
                        (props.user) ?
                            <div className='header_logado'>
                                olá {props.user} :)
                                <a href=''>postar</a>
                            </div>
                            :
                            <div className='headerLoginForm'>
                                <form>
                                    <input type='text' placeholder='usuário' />
                                    <input type='password' placeholder='senha' />
                                    <input type='submit' placeholder='login' />
                                </form>
                                <div className='btn_criarConta'>
                                    <a onClick={(a) =>abrirModalCreate(a)} href=''>Criar conta</a>
                                </div>
                            </div>
                    }

                </div>
            </div>

        </div>

    )

}


export default Header;