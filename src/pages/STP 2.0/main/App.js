import React, {useState, useEffect} from 'react';
import api from '../../../api';
import './App.css';
import './MyModal.css';

import OpenModal from "./OpenModal";
import Tabs from "./Tabs";
import MyModal from "./MyModal/MyModal";
import CloseModal from "./MyModal/CloseModal";
import Main from "../../../routes";

function App() {
    const [poles, setPoles] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const fetchPoles = async () => {
            try {
                const response = await fetch(`http://localhost:8000/poles`);
                const data = await response.json();
                setPoles(data);
                console.log("Сделан запрос")
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchPoles();
    }, []);

    return (

    <div className="App">

        <h1>Стат.Пож Version 2.0</h1>
        <div id={"tabContainer"} className={"tab_Container"}>
            <Tabs/>
            <OpenModal setModal={setModal}/>
            <MyModal visible={modal} setVisible={setModal} poles={poles}>
                {/* Здесь можно передать дополнительные данные, если нужно */}
            </MyModal>
        </div>
    </div>
)
    ;
}

export default App;