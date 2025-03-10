import React, { useRef } from 'react';

const Rectangle = ({ position, radius }) => {
    const rectangleRef = useRef(); // Создаем ссылку на mesh

    return (
        <mesh
            ref={rectangleRef}
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeGeometry args={[2 * radius, 2 * radius]} /> {/* Ширина и высота прямоугольника */}
            <meshStandardMaterial color="red" />
        </mesh>
    );
};

export default Rectangle;
