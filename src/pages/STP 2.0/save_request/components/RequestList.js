
import RequestItem from "./RequestItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const RequestList = ({requests, title, removeRequest}) => {
    console.log(requests)
    if (!requests.length) {
        return (<h1
                style={{textAlign: 'center'}}>
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {requests.map((request, index) =>
                    <CSSTransition
                    key={request.id}
                    timeout={500}
                    classNames="request"
                    >
                    <RequestItem removeRequest={removeRequest} number={index + 1} request={request}/>
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default RequestList;