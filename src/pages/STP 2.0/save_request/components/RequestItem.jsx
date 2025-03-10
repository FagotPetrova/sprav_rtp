import React from 'react';
import Mybutton from "./UI/button/Mybutton";

const RequestItem = (props) => {
    return (
        <div className="request">
            <div className="request__content">
                <strong>{props.number}.{props.request.title}</strong>
                <div>
                    {props.request.body}
                </div>
            </div>
            <div className="request_btns">
                <Mybutton onClick={()=>props.removeRequest(props.request)}>Удалить</Mybutton>
            </div>
        </div>
    );
};

export default RequestItem;