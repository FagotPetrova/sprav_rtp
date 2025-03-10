import React from 'react';
import * as THREE from "three";
import { Line } from '@react-three/drei';
const RaycasterLine = ({ start, end }) => {
    // Преобразуем координаты в массив векторов
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];

    return (
        <Line points={points} color="red" lineWidth={2} />
    );
};

export default RaycasterLine;