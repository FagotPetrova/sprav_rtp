import React, { forwardRef } from "react";

const ProbaCylinder = forwardRef((props, ref) => {
    return (
        <mesh
            ref={ref}
            position={[0, 0, -1.5]}
        >
            <cylinderGeometry args={[1, 1, 0.01, 256]} />
            <meshStandardMaterial color="green" />
        </mesh>
    );
});

export default ProbaCylinder;
