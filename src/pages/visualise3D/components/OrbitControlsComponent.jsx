import React, { useContext } from 'react';
import { ViewContext } from "../contextVisualise3D/contextVisualise3D";
import { OrbitControls } from "@react-three/drei";

const OrbitControlsComponent = () => {
    const { view } = useContext(ViewContext); // Используем контекст

    return (
        <OrbitControls
            enableRotate={view !== "2D"} // Включаем вращение только если view не "2D"
            enablePan={view === "2D"} // Включаем панорамирование только для 2D вида
        />
    );
};

export default OrbitControlsComponent;
