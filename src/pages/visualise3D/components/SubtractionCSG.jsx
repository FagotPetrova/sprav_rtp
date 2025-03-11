import React from 'react';
import { Subtraction } from '@react-three/csg';
import Circle from "./FireForms/Circle";


const SubtractionCSG = ({ roomWallsRef, fireSquarePosition, fireSquareRadius }) => {
    roomWallsRef=roomWallsRef.current.children[0]
    console.log("Считаем пересечение")
        return (
            <Subtraction>
                <primitive object={roomWallsRef} />
                <Circle position={[fireSquarePosition.x, fireSquarePosition.y, fireSquarePosition.z]} radius={fireSquareRadius} />
            </Subtraction>
        );

};

export default SubtractionCSG;