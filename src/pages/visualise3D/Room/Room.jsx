import React, {useContext, useEffect, useRef, useState} from 'react';

import GUI from 'lil-gui';
import * as THREE from 'three';

import Floor from "./Floor";
import createPointFire from "../utils/createPointFire"

import FirePoint from "./FirePoint";
import {handlePointerOut, handlePointerOver} from "../utils/changeCursor";
import {getLenghtByWalls} from "../utils/buildFire";
import RoomWalls from "./RoomWalls";
import FireSquare from "../components/FireSquare";

const Door = ({width, height, position}) => {
    const geometry = new THREE.BoxGeometry(width, height, 0.1);
    const material = new THREE.MeshStandardMaterial({color: '#a1531d'});
    return <mesh geometry={geometry} material={material} position={position}/>;
};

const Room = ({cameraRef, sceneRef}) => {
    const [distances, setDistances] = useState([]);
    const [coords_click, setCoordsClick] = useState(null);
    const roomWallsRef = useRef();
    const planeRef = useRef();
    const floorRef = useRef();

    const [roomParams, setRoomParams] = useState({
        width: 5,
        height: 3,
        depth: 5,
        wallThickness: 0.3,
        positionX: 0,
        positionZ: 0,
    });

    const handleClick = (event) => {
        const clickedPoint = createPointFire(event, cameraRef.current, floorRef.current, roomParams, sceneRef);
        if (clickedPoint) {
            const distances = getLenghtByWalls(roomParams, clickedPoint);
            setDistances(distances);
            setCoordsClick(clickedPoint);
        }
    };

    const guiRef = useRef();

    useEffect(() => {
        guiRef.current = new GUI();
        const guiElement = guiRef.current.domElement;
        guiElement.classList.add('custom-gui');
        guiRef.current.add(roomParams, 'width', 1, 10).name("Ширина,(м)").onChange(updateRoom);
        guiRef.current.add(roomParams, 'height', 1, 10).name("Высота,(м)").onChange(updateRoom);
        guiRef.current.add(roomParams, 'depth', 1, 10).name("Длина,(м)").onChange(updateRoom);
        guiRef.current.add(roomParams, 'wallThickness', 0.1, 1).name("Ширина стен,(м)").onChange(updateRoom);
        guiRef.current.add(roomParams, 'positionX', -10, 10).name("Позиция по X").onChange(updateRoom);
        guiRef.current.add(roomParams, 'positionZ', -10, 10).name("Позиция по Y").onChange(updateRoom);
        return () => {
            guiRef.current.destroy();
        };
    }, []);

    const updateRoom = () => {
        setRoomParams({...roomParams});
    };

    return (
        <>

            {/* Отображение точки огня, если кликнули */}
            {coords_click && <FirePoint position={coords_click}/>}

            {/* Стены комнаты */}
            <RoomWalls ref={roomWallsRef} roomParams={roomParams}/>

            {/* Пол комнаты */}
            <Floor
                ref={floorRef}
                width={roomParams.width}
                depth={roomParams.depth}
                position={[roomParams.positionX, 0, roomParams.positionZ]}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            />

            {coords_click && <FireSquare initialRadius={0.1} position={coords_click} distances={distances} roomWallsRef={roomWallsRef}/>}


        </>
    );
};

export default Room;
