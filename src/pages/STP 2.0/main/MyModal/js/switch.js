import get_data from "./request_utils";
import $ from './jquery.js';

function create_element_in_list(name) {
    let li = document.createElement("li")
    let details = document.createElement("details")
    details.className = "name_okrug"
    let summary = document.createElement("summary")
    summary.className = "und_or_ond_name"
    summary.innerText = name
    li.appendChild(details)
    details.appendChild(summary)
    return details
}

function rekursive_tree(items, container) {
    items.forEach(function (item) {
        let current_element = create_element_in_list(item.shortName)
        container.appendChild(current_element)
        if (item.children !== undefined) {
            if (item.children.length > 0) {
                let list = document.createElement("ul")
                current_element.appendChild(list)
                rekursive_tree(item.children, list)
            }
        }
    })
}


export default async function on_general_click(e) {
    $("#spravochnic-general-info").empty()
    let index = $(e.currentTarget).data("index")
    switch (index) {
        case 1:
            let data=await get_data()
            let list = document.createElement("ul")
            $("#spravochnic-general-info").empty()
            rekursive_tree(data['data'], list)
            $("#spravochnic-general-info").append(list);


            break;
        // case 2:
        //     data_input("Фильтр номера карточки", "Введите номер карточки", "99/99-999/999")
        //     break
        // case 3:
        //     date("Выберите дату возникновения пожара")
        //     break

    }
}
