import React from 'react';

const InputSearch = (props) => {
    return (
        <div>
            <input className={"inputSearch"} placeholder="Поиск по полю" {...props} type="text"/>
        </div>
    );
};

export default InputSearch;