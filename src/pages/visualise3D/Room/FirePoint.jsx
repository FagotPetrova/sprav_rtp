import { Circle } from "@react-three/drei";

const FirePoint = ({ position }) => {
    return (
        <Circle args={[0.1, 32]} position={[position.x, position.y, position.z]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="black" />
        </Circle>
    );
};

export default FirePoint;