import React, {useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment,} from '@react-three/drei';
import FireExtinguisher from "./Room/FireExtinguisher";
import './visualise3D.css';
import Room from "./Room/Room";
import {ViewProvider} from "./contextVisualise3D/contextVisualise3D";
import Toggle from "./components/Toogle";

import Camera from "./components/Camera";
import OrbitControlsComponent from "./components/OrbitControlsComponent";
import TestPlane from "./components/TestPlane";
import TestCube from "./components/TestCube";

const Visualise3D = () => {
    const cameraRef = useRef(); // Создаем ref для камеры
    const sceneRef = useRef();
    return (
        <ViewProvider>
            <Toggle/>
            <Canvas ref={sceneRef}>
                <Camera ref={cameraRef}/>
                <OrbitControlsComponent/>
                <Environment files="models/background.hdr" background={true}/>
                {/* Компоненты комнаты */}

                <Room  cameraRef={cameraRef} sceneRef={sceneRef}/>
                {/*<TestCube/>*/}
                {/* Компонент огнетушителя */}
                <FireExtinguisher/>
            </Canvas>
        </ViewProvider>
    );
};

export default Visualise3D;
