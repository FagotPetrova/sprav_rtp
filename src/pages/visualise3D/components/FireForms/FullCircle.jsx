
import React, {forwardRef} from "react";

const FullCircle = forwardRef(({ position, radius }, ref) => {
    return (
        <mesh
            ref={ref} // Используем переданный реф
            position={position}>
            <cylinderGeometry args={[radius, radius, 0.01, 256]}/>
            <meshStandardMaterial color="red" />
        </mesh>
    );
});

export default FullCircle;