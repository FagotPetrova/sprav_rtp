import React, {useContext, useRef} from 'react';
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { ViewContext } from "../contextVisualise3D/contextVisualise3D";

const Camera = React.forwardRef((props, ref) => {
    const { view } = useContext(ViewContext);

    return (
        <>
            {view === "3D" ? (
                <PerspectiveCamera ref={ref} makeDefault fov={75} position={[0, 12, 5]} />
            ) : (
                <OrthographicCamera
                ref={ref}
                makeDefault
                zoom={50}
                position={[0, 20, 0]} // Установите позицию камеры выше
                rotation={[-Math.PI / 2, 0, 0]} // Поверните камеру

            />
            )}
        </>
    );
});

export default Camera;
