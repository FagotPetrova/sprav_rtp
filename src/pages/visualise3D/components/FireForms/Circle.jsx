
import {forwardRef} from "react";

const Circle = forwardRef(({ position, radius }, ref) => {
    return (
        <mesh
            ref={ref} // Используем переданный реф
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[radius, 64]} /> {/* 64 - количество сегментов */}
            <meshStandardMaterial color="red" />
        </mesh>
    );
});

export default Circle;