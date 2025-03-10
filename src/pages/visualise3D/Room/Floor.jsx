import React from 'react';
import * as THREE from "three";

const Floor = React.forwardRef(({width, depth, position, onClick,onPointerOver,onPointerOut},ref) => {
    const geometry = new THREE.PlaneGeometry(width, depth);

    const material = new THREE.MeshStandardMaterial({color: '#55dde3'});
    return (
        <mesh
            ref={ref}
            geometry={geometry}
            material={material}
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}
            onClick={onClick} // Добавляем обработчик клика
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
        />
    );
});

export default Floor;