import React, { forwardRef } from 'react';
import { Plane } from '@react-three/drei';

const TestPlane = forwardRef((props, ref) => {
    return (
        <Plane ref={ref} args={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[2, 2, 0]}>
            <meshStandardMaterial color="lightblue" />
        </Plane>
    );
});

export default TestPlane;
