import React from 'react';
import {useFrame} from "@react-three/fiber";
import {useState, useRef, useEffect} from "react";
import {Line} from "@react-three/drei";
import Vectors from "./Vectors";
import Circle from "./FireForms/Circle";
import Rectangle from "./FireForms/Rectangle";
import Polovina from "./FireForms/Polovina";


const FireSquare = ({initialRadius, position, distances}) => {
    const rectangleRef = useRef();
    const [radius, setRadius] = useState(initialRadius);
    const [formFire, setFormFire] = useState("Rectangle_HalfCircle");
    const [minDistance, setMinDistance] = useState(null)


    // Логируем minDistance только при изменении distances
    useEffect(() => {
        const newMinDistance = Math.min(...distances.map(item => item.distance));
        setMinDistance(newMinDistance);
        console.log(newMinDistance);
    }, [distances]);

    // Анимируем увеличение радиуса
    useFrame(() => {
        setRadius((prevRadius) => prevRadius + 0.001);
        if (radius >= minDistance) {
            console.log("Форма прямоугольника")
            setFormFire("Circle")
        }
    });

    return (
        <>
            <Vectors position={position} distances={distances}/>
            {formFire === "Circle" && (
                <Circle position={[position.x, position.y, position.z]} radius={radius}/>
            )}


        </>
    );
};

export default FireSquare;