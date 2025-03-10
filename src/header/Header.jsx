import React, {useContext, useState} from 'react';
import Menu from "./Menu";
import {privateRoutes, publicRouters} from './lstRoutes'; // Импортируйте ваши маршруты
import "./header.css";
import {AuthContext} from "../context/context";

const MenuComponent = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [isMenuClick, setIsMenuClick] = useState(false);
    const [isMenuHover, setIsMenuHover] = useState(false);
    const menuItems = isAuth ? privateRoutes : publicRouters;

    const toggleMenuOnClick = () => {
        setIsMenuClick(!isMenuClick);
        setIsMenuHover(false);
    };

    const toggleMenuOnHover = () => {
        setIsMenuHover(true);
    };

    const toggleMenuOffHover = () => {
        setIsMenuHover(false);
    };

    return (
        <>
            <Menu
                menuItems={menuItems}
                toggleMenuOnClick={toggleMenuOnClick}
                isMenuClick={isMenuClick}
                toggleMenuOnHover={toggleMenuOnHover}
                isMenuHover={isMenuHover}
                toggleMenuOffHover={toggleMenuOffHover}
            />
        </>
    );
};

export default MenuComponent;
