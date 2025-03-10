import React, {useMemo, useState} from 'react';
import CloseModal from './CloseModal';
import InputSearch from "./InputSearch";

import ModalData from "./ModalData";

const MyModal = ({children, visible, setVisible, poles}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPoles = useMemo(() => {
        if (searchQuery === '') {
            return poles;
        }
        return Object.entries(poles).filter(([key, value]) => key.toLowerCase().includes(searchQuery.toLowerCase())).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value
        }), {});
    }, [searchQuery, poles]);

    const rootClasses = ["myModal"];

    if (visible) {
        rootClasses.push("myModalActive");
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={"myModalContent"}>
                <InputSearch
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <CloseModal setModal={setVisible}/>
                <ModalData poles={filteredPoles}/>


                {children}
            </div>
        </div>
    );
};

export default MyModal;


