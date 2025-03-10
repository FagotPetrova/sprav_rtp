import React, {useState} from 'react';

import AllPoles from "./AllPoles";
import DataSelectPole from "./DataSelectPole";

const ModalData = ({poles}) => {
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

        <div className={"grid"}>
            <AllPoles poles={poles} selectedIndices={selectedIndices} handleClick={handleClick}/>
            <DataSelectPole/>
        </div>

    );
};


export default ModalData;
