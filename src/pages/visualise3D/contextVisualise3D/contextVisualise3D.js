import React, { createContext, useState } from "react";

// Создаем контекст
export const ViewContext = createContext(null);

// Провайдер контекста
export const ViewProvider = ({ children }) => {
    const [view, setView] = useState("2D");

    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    );
};