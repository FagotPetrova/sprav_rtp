import React from 'react';
import InputRequest from "../STP 2.0/save_request/components/UI/input/InputRequest";
import Mybutton from "../STP 2.0/save_request/components/UI/button/Mybutton";

const Login = () => {
    localStorage.setItem('auth','true')
    return (
        <div>
            <h1>Страница для логина</h1>
            <form>
                <InputRequest type="text" placeholder="Введите логин"/>
                <InputRequest type="password" placeholder="Введите пароль"/>
                <Mybutton>Войти</Mybutton>
            </form>
        </div>
    );
};

export default Login;