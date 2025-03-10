import React, {useState, useMemo, useEffect} from 'react';

import '../styles/RequestFireCard.css';
import RequestList from "./RequestList";

import RequestForm from "./RequestForm";
import RequestFilter from "./RequestFilter";
import Modal from "./Modal/Modal";
import Mybutton from "./UI/button/Mybutton";
import {useRequests} from "../../../../hooks/useRequests";
import axios from "axios";
import RequestService from "../../API/RequestService";
import Loader from "./UI/Loader/Loader";
import {useFetching} from "../../../../hooks/useFetching";


const App = () => {
    const [requests, setRequests] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalCount,setTotalCount]=useState(0)
    const sortedAndSearchRequests = useRequests(requests, filter.sort, filter.query)
    const [fetchRequests,isRequestsLoading,requestError]=useFetching(async ()=>{
        const response = await RequestService.getAll();
        setRequests(response.posts)
    })

    useEffect(() => {
        fetchRequests()
        console.log("useEffect")
    }, [])

    const createRequest = (newRequest) => {
        setRequests([...requests, newRequest])
        setModal(false)
    }


    const removeRequest = (request) => {
        setRequests(requests.filter(r => r.id !== request.id))
    }

    return (
        <div className="App">
            <button onClick={fetchRequests}>1111</button>
            <Mybutton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать что-то
            </Mybutton>
            <Modal visible={modal} setVisible={setModal}>
                <RequestForm createRequest={createRequest}/>
            </Modal>

            <hr style={{margin: '15px'}}/>
            <RequestFilter
                filter={filter}
                setFilter={setFilter}
            />
            {requestError &&
                <h1>Произошла ошибка ${requestError}</h1>
            }
            {isRequestsLoading
                ?
                <div style={{display:'flex',justifyContent:'center',marginTop:50}}><Loader/></div>
                : <RequestList
                    removeRequest={removeRequest}
                    requests={sortedAndSearchRequests}
                    title={"Список запросов пользователя User"}/>
            }


        </div>
    );
};

export default App;