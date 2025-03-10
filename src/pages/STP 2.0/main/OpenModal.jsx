import React from 'react';

const OpenModal = ({ setModal }) => {
    return (
        <div>
            <button className="open_modal" onClick={() => setModal(true)}></button>
        </div>
    );
};

export default OpenModal;