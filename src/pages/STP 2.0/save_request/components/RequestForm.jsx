import React, {useState} from 'react';
import InputRequest from "./UI/input/InputRequest";
import Mybutton from "./UI/button/Mybutton";

const RequestForm = ({createRequest}) => {
    const [request, setRequest] = useState({title: '', body: ''})
    const addNewRequest = (e) => {
        e.preventDefault()
        const newRequest={
            ...request,id:Date.now()
        }
        createRequest(newRequest)
            setRequest({title:'',body:''})



    }
    return (
        <form>
            <InputRequest
                type="text"
                value={request.title}
                onChange={e => setRequest({...request, title: e.target.value})}
                placeholder={"Адрес пожара"}></InputRequest>
            <InputRequest
                type="text"
                value={request.body}
                onChange={e => setRequest({...request, body: e.target.value})}
                placeholder={"Описание пожара"}></InputRequest>
            <Mybutton onClick={addNewRequest}>Добавить пост</Mybutton>
        </form>
    );
};

export default RequestForm;