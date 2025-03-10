
import {Redirect, Route} from "react-router-dom";
import React from 'react';
// Функция для отрисовки маршрутов
export const drawMenuByLogin = (lstMenu,redirect_url) => {
    return Object.entries(lstMenu).flatMap(([category, items]) =>
        items.map((item, index) => (
            item.element ? (
                <Route key={index} path={item.link} element={item.element}/>
            ) : null
        ))
    );


};
