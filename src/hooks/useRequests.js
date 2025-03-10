//На вход подаем массив и метод сортировки
import {useMemo} from "react";

export const useSortedRequests=(requests, sort)=>{
    const sortedRequests = useMemo(() => {
        console.log("Сработала useMemo ")
        if (sort) {
            return [...requests].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return requests
    }, [sort, requests])
    return sortedRequests
}
export const useRequests=(requests,sort,query)=>{
    const sortedRequests=useSortedRequests(requests,sort)
  const sortedAndSearchRequests = useMemo(() => {
        return sortedRequests.filter(request => request.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedRequests])
    return sortedAndSearchRequests
}