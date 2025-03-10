import React from 'react';
import {useRef} from "react";

const Polovina = ({position, radius}) => {
    const HalfCircle = useRef()
    return (
        <mesh
            ref={HalfCircle}
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius, 64, Math.PI, Math.PI]}/>
            {/* Полукруг */}
            <meshStandardMaterial color="red"/>
        </mesh>
    );
};

export default Polovina;