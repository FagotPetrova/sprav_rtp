import React from 'react';
import {Link} from 'react-router-dom';

const Menu = ({
                  menuItems,
                  toggleMenuOnClick,
                  isMenuClick,
                  toggleMenuOnHover,
                  isMenuHover,
                  toggleMenuOffHover,

              }) => {
    return (

        <>
            <header className={`header${isMenuClick ? " active" : ""}`}>
                <a href="#" className="logo">Название</a>
                <div className="toggleBtn" onClick={toggleMenuOnClick}></div>
                <nav className="nav">
                    <ul>
                        {Object.entries(menuItems)
                            .filter(([title, subItems]) =>
                                !subItems.some(item => item.link === "/error") // Фильтруем подменю, содержащие "/error"
                            )
                            .map(([title, subItems]) => (
                                <li
                                    onMouseEnter={toggleMenuOnHover}
                                    onMouseLeave={toggleMenuOffHover}
                                    key={title}
                                >
                                    <a href="#">
                                        {title}
                                        {subItems ? <i className="ri-arrow-down-fill"></i> : null}
                                    </a>
                                    {subItems && (
                                        <ul>
                                            {subItems.map((item) => (
                                                <li
                                                    className={`subMenu${isMenuHover ? " active" : ""}`} // Используйте обратные кавычки для шаблонной строки
                                                    onClick={() => toggleMenuOnClick(item)} // Передаем выбранный элемент
                                                    key={item.name}
                                                >
                                                    <Link to={item.link}>{item.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Menu;