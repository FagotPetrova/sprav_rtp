import React, { useState } from 'react';
import './tabs.css';
import { v4 as uuidv4 } from 'uuid';

const Tabs = () => {
    const [tabs, setTabs] = useState([{
        id: uuidv4(),
        name: 'Боковик 1',
        counter: 1
    }]);


    const handleClickAddTab = () => {
        if (tabs.length < 5) { // Проверяем, что количество вкладок меньше 5
            const newTab = {
                id: uuidv4(),
                name: 'Боковик '+(tabs[tabs.length - 1].counter + 1),
                counter: tabs[tabs.length - 1].counter + 1
            };
            setTabs([...tabs, newTab]);
        }
    };

    const handleClickDeleteTab = (id) => {
        if (tabs.length > 1) {
            setTabs(prevState => prevState.filter(tab => tab.id !== id));
        }
    };

    const [editingTabId, setEditingTabId] = useState(null);
    const [text, setText] = useState('');
    console.log(tabs)
    const handleButtonClick = (id, currentName) => {
        setEditingTabId(id);
        setText(currentName);
    };

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleInputBlur = () => {
        setTabs(prevState => {
            return prevState.map(tab => {
                if (tab.id === editingTabId) {

                    return { ...tab, name: text};

                } else {
                    return tab;
                }
            });
        });
        setEditingTabId(null);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleInputBlur();
        }
    };

    return (
        <div>
            <div className="tabsContainer">
                {tabs.map(tab => {
                    if (editingTabId === tab.id) {
                        return (
                            <div className="tabContainer" key={tab.id}>
                                <input className="inputChangeBokovik"
                                       maxLength={12}
                                    type="text"
                                    value={text}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    onKeyDown={handleInputKeyDown}
                                    autoFocus
                                />
                                <button
                                    className="removeTab"
                                    onClick={() => handleClickDeleteTab(tab.id)}
                                >
                                    X
                                </button>
                                {tabs[tabs.length - 1].id === tab.id && (
                                    <button
                                        className="addTab"
                                        onClick={handleClickAddTab}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <div className="tabContainer" key={tab.id}>
                                <button
                                    className="mainTabBtn"
                                    onClick={() => handleButtonClick(tab.id, (tab.name))}
                                >
                                    {tab.name}
                                </button>
                                <button
                                    className="removeTab"
                                    onClick={() => handleClickDeleteTab(tab.id)}
                                >
                                    X
                                </button>
                                {tabs[tabs.length - 1].id === tab.id && (
                                    <button
                                        className="addTab"
                                        onClick={handleClickAddTab}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Tabs;
