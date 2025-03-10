import React from 'react';

import {Canvas} from '@react-three/fiber';
import Box from './FireExtinguisher';
import {OrbitControls, useGLTF} from '@react-three/drei';
import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const FireExtinguisher = () => {
    const { scene } = useGLTF('/models/fire.glb');
    return <primitive object={scene} />;
};
export default FireExtinguisher;