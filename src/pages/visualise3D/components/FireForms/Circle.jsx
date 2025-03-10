import React, { useRef } from 'react';

const Circle = ({ position, radius }) => {
    const circleRef = useRef(); // Создаем ссылку на mesh

    return (
        <mesh
            ref={circleRef}
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius, 64]} /> {/* 64 - количество сегментов */}
            <meshStandardMaterial color="red" />
        </mesh>
    );
};

export default Circle;