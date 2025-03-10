import React from "react";

export const handlePointerOver = () => {
    document.body.style.cursor = 'cell'; // Меняем курсор на указатель
};

export const handlePointerOut = () => {
    console.log("Убрали с пола")
    document.body.style.cursor = 'auto'; // Возвращаем курсор в исходное состояние
};