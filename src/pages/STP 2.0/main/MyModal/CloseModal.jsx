import React from 'react';

const CloseModal = ({ setModal }) => {
    return (
        <div>
            <button className="close_modal" onClick={() => setModal(false)}>
            </button>
        </div>
    );
};

export default CloseModal;