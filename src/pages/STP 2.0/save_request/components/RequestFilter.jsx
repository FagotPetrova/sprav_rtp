import React from 'react';
import InputRequest from "./UI/input/InputRequest";
import SortSelect from "./UI/select/sortSelect";

const RequestFilter = ({filter,setFilter}) => {
    return (
        <div>
            <InputRequest
                value={filter.query}
                onChange={e => setFilter({...filter,query:e.target.value})}
                placeholder="Поиск..."/>
            <SortSelect
                value={filter.sort}
                options={[
                    {value: 'title', name: "По названию"},
                    {value: 'body', name: "По описанию"}

                ]}
                defaultValue="Сортировка"

                onChange={selectedSort=>setFilter({...filter,sort:selectedSort})}


            />
        </div>
    );
};

export default RequestFilter;