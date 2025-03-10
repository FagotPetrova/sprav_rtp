import React from 'react';
import './Mybutton.css'
const Mybutton = ({children,...props}) => {
    return (
        <button {...props} className="AddRequest">
            {children}
        </button>
    );
};

export default Mybutton;