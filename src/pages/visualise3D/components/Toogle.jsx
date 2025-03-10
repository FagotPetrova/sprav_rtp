import React, { useState } from 'react';
import {useContext} from "react";
import {ViewContext} from "../contextVisualise3D/contextVisualise3D";

const Toggle = () => {
    const { view, setView } = useContext(ViewContext); // Используем контекст
    const handleToggle = () => {
        setView((prevView) => (prevView === "2D" ? "3D" : "2D"));
    };

    return (
        <div className={`onoffswitch ${view}`}> {/* Здесь используется правильный синтаксис */}
            <input
                type="checkbox"
                name="onoffswitch"
                className="onoffswitch-checkbox"
                id="myonoffswitch"
                tabIndex="0"
                checked={view === "3D"}
                onChange={handleToggle} // Обработчик изменения
            />
            <label className="onoffswitch-label" htmlFor="myonoffswitch">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
            </label>
        </div>
    );
};

export default Toggle;