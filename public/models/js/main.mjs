import * as THREE from 'three';
import {GUI} from 'lil-gui';
import {OrbitControls} from 'OrbitControls';
import {GLTFLoader} from 'GLTFLoader';

// Настройка сцены
const gui = new GUI();
const canvas = document.getElementById("webgl");
const scene = new THREE.Scene();
const gltLoader = new GLTFLoader();
let selectedObject = null; // Переменная для хранения выделенного объекта
let lstAllObjects = []
let isGKeyPressed = false;
// Параметры комнаты
// const roomParams = {
//     width: 5, // Ширина комнаты
//     height: 3, // Высота комнаты
//     depth: 5, // Глубина комнаты
//     wallThickness: 0.3 // Толщина стен
// };

// gltLoader.load('static/fire.glb', (gltf) => {
//     const extinguisher = gltf.scene.children[0];
//     lstAllObjects.push(extinguisher)
//     scene.add(extinguisher);
//
//
// }, undefined, (error) => {
//     console.error(error);
// });


// Функция для создания стен
// function createWall(width, height, depth, position) {
//     const geometry = new THREE.BoxGeometry(width, height, depth);
//     const material = new THREE.MeshStandardMaterial({color: '#7a7b6e'});
//     const wall = new THREE.Mesh(geometry, material);
//     wall.position.copy(position);
//     return wall;
// }

const floorColor = '#55dde3'

function createFloor(width, depth, position) {
    const material_floor = new THREE.MeshStandardMaterial({color: floorColor}); // Цвет коричневый для пола
    const geometry = new THREE.PlaneGeometry(width, depth);
    const floor = new THREE.Mesh(geometry, material_floor);
    floor.name = 'floor'
    floor.rotation.x = -Math.PI / 2; // Поворачиваем пол, чтобы он был горизонтальным
    floor.position.copy(position); // Устанавливаем позицию пола
    return floor;
}

// Функция для создания дверного проема
function createDoor(width, height, position) {
    const material = new THREE.MeshStandardMaterial({color: '#a1531d'}); // Цвет двери
    const geometry = new THREE.BoxGeometry(width, height, 0.1); // Толщина двери может быть небольшой
    const door = new THREE.Mesh(geometry, material);
    door.position.copy(position);
    return door;
}

// Создание группы для стен
const roomGroup = new THREE.Group();

// Обновленная функция houseCollection для создания стен и дверного проема
function houseCollection() {
    const walls = [
        // Передняя стена
        createWall(roomParams.width + roomParams.wallThickness * 2, roomParams.height, roomParams.wallThickness, new THREE.Vector3(0, roomParams.height / 2, -(roomParams.depth / 2 + roomParams.wallThickness / 2))),
        // Задняя стена
        createWall(roomParams.width + roomParams.wallThickness * 2, roomParams.height, roomParams.wallThickness, new THREE.Vector3(0, roomParams.height / 2, (roomParams.depth / 2 + roomParams.wallThickness / 2))),
        // Левая стена
        createWall(roomParams.wallThickness, roomParams.height, roomParams.depth, new THREE.Vector3(-(roomParams.width / 2 + roomParams.wallThickness / 2), roomParams.height / 2, 0)),
        // Правая стена
        createWall(roomParams.wallThickness, roomParams.height, roomParams.depth, new THREE.Vector3((roomParams.width / 2 + roomParams.wallThickness / 2), roomParams.height / 2, 0)),
    ];

    // Добавление новых стен в группу
    walls.forEach(wall => roomGroup.add(wall));

    // Создание и добавление пола
    const floorPosition = new THREE.Vector3(0, 0, 0); // Позиция пола на уровне 0
    const floor = createFloor(roomParams.width + roomParams.wallThickness * 2, roomParams.depth + roomParams.wallThickness * 2, floorPosition);
    roomGroup.add(floor); // Добавляем пол в группу

    // Создание дверного проема
    const doorWidth = 1; // Ширина двери
    const doorHeight = 2; // Высота двери
    const doorPosition = new THREE.Vector3(0, doorHeight / 2, -(roomParams.depth / 2 + roomParams.wallThickness / 2)); // Позиция двери на передней стене
    const door = createDoor(doorWidth, doorHeight, doorPosition);
    roomGroup.add(door); // Добавляем дверь в группу

}

houseCollection();

// Освещение
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
scene.add(ambientLight);
const moonLight = new THREE.DirectionalLight('#ffffff', 1);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);
// Добавление группы в сцену
lstAllObjects.push(roomGroup)
scene.add(roomGroup);


// Добавление GUI для изменения размеров
gui.add(roomParams, 'width', 1, 10).onChange(updateRoom);
gui.add(roomParams, 'height', 1, 10).onChange(updateRoom);
gui.add(roomParams, 'depth', 1, 10).onChange(updateRoom);
gui.add(roomParams, 'wallThickness', 0.1, 1).onChange(updateRoom);

// Функция для обновления размеров комнаты
function updateRoom() {
    // Удаляем старые стены
    while (roomGroup.children.length > 0) {
        roomGroup.remove(roomGroup.children[0]);
    }
    houseCollection();

    // Устанавливаем позицию камеры
    cameraOrt.position.set(0, roomParams.height + 5, 0); // Установите камеру выше
    cameraOrt.lookAt(0, roomParams.height / 2, 0); // Направьте камеру на центр
}

// Камера
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const aspectRatio = sizes.width / sizes.height;
const cameraOrt = new THREE.OrthographicCamera(
    -aspectRatio * 10, // Левый край
    aspectRatio * 10,   // Правый край
    10,                 // Верхний край
    -10,                // Нижний край
    1,                  // Ближняя плоскость
    1000                // Дальняя плоскость
);

cameraOrt.position.set(0, 5, 0); // Установите камеру выше
cameraOrt.lookAt(0, 0, 0); // Направьте камеру вниз на центр
scene.add(cameraOrt);

// RaycasterLine
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector3();

// Исходный и цвет при наведении
const originalWallColor = '#7a7b6e'; // Исходный цвет стен
const hoverWallColor = '#0000ff'; // Цвет стен при наведении (синий)
// Функция для проверки пересечения с помещением
function checkMouseHover() {
    raycaster.setFromCamera(mouse, currentCamera); // Устанавливаем raycaster с текущей камерой
    const intersects = raycaster.intersectObject(roomGroup, true); // Проверяем пересечения с roomGroup

    if (intersects.length > 0) {
        selectedObject = roomGroup
        // Если курсор над помещением, меняем цвет
        roomGroup.children.forEach(child => {
            child.material.color.set(hoverWallColor);
        });
    } else {
         selectedObject = null;
        // Восстанавливаем исходный цвет, если курсор не над помещением
        roomGroup.children.forEach(child => {
            if (child.name === 'floor') {
                child.material.color.set(floorColor);

            } else {
                child.material.color.set(originalWallColor);
            }


        });
    }
}

// Обновляем событие mousemove
window.addEventListener('click', (e) => {

    checkMouseHover(); // Проверяем пересечения при движении мыши

    isGKeyPressed = false
});

// Создание перспективной камеры
const cameraPerspective = new THREE.PerspectiveCamera(
    75, // Угол обзора (в градусах)
    sizes.width / sizes.height, // Соотношение сторон
    0.1, // Ближняя плоскость
    1000 // Дальняя плоскость
);

// Установка позиции камеры
cameraPerspective.position.set(0, 5, 10); // Установите камеру выше и дальше от сцены
cameraPerspective.lookAt(0, 0, 0); // Направьте камеру на центр сцены

// Добавление камеры в сцену (необязательно, но может быть полезно для организации)
scene.add(cameraPerspective);

// Рендерер
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#ffffff'); // Устанавливаем цвет фона на белый

// Контролы
const controls = new OrbitControls(cameraPerspective, renderer.domElement);

let currentCamera = cameraOrt; // Начинаем с ортографической камеры
// Обработчик события для колесика мыши


// Рендеринг
const switchInput = document.getElementById('switcher');

switchInput.addEventListener('change', function () {
    if (this.checked) {
        currentCamera = cameraPerspective; // Переключаем на перспективную камеру
    } else {
        currentCamera = cameraOrt; // Переключаем на ортографическую камеру
    }
});
// Обработка нажатия клавиши "G" для перемещения объекта
window.addEventListener('keydown', (event) => {
    if (event.code === 'KeyG' && selectedObject) { // Проверяем, нажата ли клавиша "G" и есть ли выделенный объект
        isGKeyPressed = true
    }
});

const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Плоскость XY

window.addEventListener('mousemove', (e) => {
    // Обновляем позицию мыши
    mouse.x = (e.clientX / sizes.width) * 2 - 1;
    mouse.y = -(e.clientY / sizes.height) * 2 + 1;

    if (isGKeyPressed && selectedObject) {
        // Обновляем луч с учетом камеры и позиции мыши
        raycaster.setFromCamera(mouse, currentCamera);

        // Получаем точку пересечения с плоскостью
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectPoint);

        // Перемещаем объект в точку пересечения
        roomGroup.position.copy(intersectPoint);
    }
});
const render = () => {
    controls.update();
    renderer.render(scene, currentCamera); // Рендерим с текущей камерой
    window.requestAnimationFrame(render);
};

// Запускаем рендеринг
render();