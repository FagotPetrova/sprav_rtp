import React from 'react';
import {Line} from "@react-three/drei";

const Vectors = ({position, distances}) => {
    const leftDistance = distances.find(dist => dist.side === "left")?.distance
    const rightDistance = distances.find(dist => dist.side === "right")?.distance
    const frontDistance = distances.find(dist => dist.side === "front")?.distance
    const backDistance = distances.find(dist => dist.side === "back")?.distance
    return (
        <>
            {/* Правый вектор */}
            <Line
                points={[
                    [position.x, position.y, position.z], // Начальная точка
                    [position.x + rightDistance, position.y, position.z] // Конечная точка
                ]}
                color="blue"
                lineWidth={2}
            />
            {/* Левый вектор */}
            <Line
                points={[
                    [position.x, position.y, position.z], // Начальная точка
                    [position.x- leftDistance, position.y, position.z ] // Конечная точка
                ]}
                color="blue"
                lineWidth={2}
            />
            {/* Верхний вектор */}
            <Line
                points={[
                    [position.x, position.y, position.z], // Начальная точка
                    [position.x,position.y, position.z-frontDistance] // Конечная точка
                ]}
                color="blue"
                lineWidth={2}
            />
            {/* Нижний вектор */}
            <Line
                points={[
                    [position.x, position.y, position.z], // Начальная точка
                    [position.x, position.y, position.z+backDistance] // Конечная точка
                ]}
                color="blue"
                lineWidth={2}
            />
        </>
    );
};

export default Vectors;