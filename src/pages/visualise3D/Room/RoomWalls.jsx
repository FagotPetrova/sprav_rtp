import React from 'react';
import * as THREE from "three";
import {forwardRef} from "react";

const Wall = ({ width, height, depth, position, rotation, name }) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: '#7a7b6e' });

    return (
        <mesh geometry={geometry} material={material} position={position} rotation={rotation} name={name} />
    );
};

const RoomWalls = forwardRef(({ roomParams }, ref) => {
    return (
        <group ref={ref}>
            {/* Передняя стена */}
            <Wall
                name={'front'}
                width={roomParams.width + roomParams.wallThickness * 2}
                height={roomParams.height}
                depth={roomParams.wallThickness}
                position={[
                    roomParams.positionX,
                    0,
                    roomParams.positionZ - (roomParams.depth / 2 + roomParams.wallThickness / 2)
                ]}
            />
            {/* Задняя стена */}
            <Wall
                name={'back'}
                width={roomParams.width + roomParams.wallThickness * 2}
                height={roomParams.height}
                depth={roomParams.wallThickness}
                position={[
                    roomParams.positionX,
                    0,
                    roomParams.positionZ + (roomParams.depth / 2 + roomParams.wallThickness / 2)
                ]}
            />
            {/* Левая стена */}
            <Wall
                name={'left'}
                width={roomParams.wallThickness}
                height={roomParams.height}
                depth={roomParams.depth}
                position={[
                    roomParams.positionX - (roomParams.width / 2 + roomParams.wallThickness / 2),
                    0,
                    roomParams.positionZ
                ]}
            />
            {/* Правая стена */}
            <Wall
                name={'right'}
                width={roomParams.wallThickness}
                height={roomParams.height}
                depth={roomParams.depth}
                position={[
                    roomParams.positionX + (roomParams.width / 2 + roomParams.wallThickness / 2),
                    0,
                    roomParams.positionZ
                ]}
            />
        </group>
    );
});

export default RoomWalls;
