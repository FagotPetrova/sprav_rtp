import React from 'react';
import * as CSG from '@react-three/csg';
import * as THREE from 'three';

const TestCube = () => {
    // Генерация случайных размеров и позиций для кубов
    const size1 = Math.random() * 2 + 1; // Размер куба 1 от 1 до 3
    const size2 = Math.random() * 2 + 1; // Размер куба 2 от 1 до 3
    const position1 = new THREE.Vector3(
        Math.random() * 4 - 2, // Позиция по X от -2 до 2
        Math.random() * 4 - 2, // Позиция по Y от -2 до 2
        Math.random() * 4 - 2  // Позиция по Z от -2 до 2
    );
    const position2 = new THREE.Vector3(
        Math.random() * 4 - 2,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
    );

    return (
        <CSG.Subtraction>
            {/* Первый куб */}
            <mesh position={position1}>
                <boxGeometry args={[size1, size1, size1]} />
                <meshStandardMaterial color="blue" />
            </mesh>
            {/* Второй куб */}
            <mesh position={position2}>
                <boxGeometry args={[size2, size2, size2]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </CSG.Subtraction>
    );
};

export default TestCube;