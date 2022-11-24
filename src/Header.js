import React, { useState, useEffect } from 'react';

function Header() {

    const [user, setUser] = useState(`Rebeca`);

    return (

        <div className='app'>
            <div className='header'>
                <div className='center'>
                    <div className='headerLogo'>
                        <a href=''><img src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' /></a>
                    </div>

                    {
                        // isso pode ser testado mudando o useState(null) para qualquer coisa (entre `` ou "")
                        (user) ?
                            <div className='header_logado'>
                                olá {user} :)
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
                                    <a href=''>Criar conta</a>
                                </div>
                            </div>
                    }

                </div>
            </div>

        </div>

    )

}


export default Header;