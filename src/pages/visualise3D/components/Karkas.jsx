import React, { forwardRef } from 'react';


const Karkas = forwardRef(({size}, ref) => {
    return (
        <mesh ref={ref} position={[size.positionX, 0, size.positionZ]} >
            <boxGeometry args={[size.width,size.height,size.depth]}  />
            <meshStandardMaterial color="orange" wireframe={true} transparent={true} opacity={0} />
        </mesh>
    );
});

export default Karkas;