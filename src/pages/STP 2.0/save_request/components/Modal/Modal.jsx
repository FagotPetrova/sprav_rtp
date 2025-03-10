import React from 'react';
import './Modal.css'
const Modal = ({children,visible,setVisible}) => {
    return (
        <div className={`Modal ${visible ? 'active' : ''}`} onClick={()=>setVisible(false)}>
            <div className="ModalContent" onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;