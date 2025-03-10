import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate, Redirect} from 'react-router-dom';
import {privateRoutes, publicRouters} from '././header/lstRoutes';
import Header from "./header/Header";
import "./style.css"
import {drawMenuByLogin} from "./header/drawMenuByLogin";
import {useState} from "react";
import {AuthContext} from "./context/context";


const Main = () => {
    const [isAuth, setIsAuth] = useState(true)
    useEffect(()=>{
        if (localStorage.getItem('auth')){
            setIsAuth(true)
        }
    },[])
    const redirect_url = isAuth ? "/error" : "/login";
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Header/>
                <div className="content">
                    <Routes>

                        {isAuth
                            ? drawMenuByLogin(privateRoutes)
                            : drawMenuByLogin(publicRouters)}
                        <Route path="*" element={<Navigate to={redirect_url} replace/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default Main;