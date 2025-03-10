import React, { useState } from 'react';
import on_general_click from './js/switch'

const AllPolesList = ({ poles, selectedIndices, handleClick }) => {
    return (
        <div className="select_poles">
            {Object.keys(poles).map((key, index) => {
                let className = 'all_poles_';
                if (selectedIndices.includes(index)) {
                    className += 'selected';
                }
                if (key === key.toUpperCase()) {
                    className = 'razdel';
                }
                return (
                    <div key={index}
                        className={className}
                        onClick={() => handleClick(index)}
                    >
                        <div className={"block general-info"} data-index={poles[key]} onClick={on_general_click}>
                            {key}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const AllPoles = ({ poles }) => {

    const [selectedIndices, setSelectedIndices] = useState([]);

    const handleClick = (index) => {
        const currentIndex = selectedIndices.indexOf(index);
        if (currentIndex === -1) {
            setSelectedIndices([...selectedIndices, index]);
        } else {
            setSelectedIndices(selectedIndices.filter((i) => i !== index));
        }
    };

    return (

            <AllPolesList poles={poles} selectedIndices={selectedIndices} handleClick={handleClick} />
    );
};

export default AllPoles;
