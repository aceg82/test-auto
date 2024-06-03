const URL_TEST = "https://api.jsonbin.io/v3/b/66573414ad19ca34f871177c"

document.addEventListener("DOMContentLoaded", () => {

    let demandInfoContainer = document.querySelector(".demand-container")
    let searchButton = document.querySelector(".search-button")
    let searchMessage = document.querySelector(".search-message")
    let tableBodyContainer = document.querySelector(".table-body")

    const searchDemand = (demandId) => {
        let xhr
        let datas
        
        xhr = new XMLHttpRequest()

        xhr.open('GET', URL_TEST)

        xhr.onerror = () => {
            searchButton.insertAdjacentHTML('afterend', '<span class="error-message">Page not found</span>')
        }

        xhr.onloadend = () => {
            datas = JSON.parse(xhr.responseText)

            if( xhr.status >= 200 && xhr.status < 400) {
                console.log('Getting all datas went well...')

                if(demandId > 0 && demandId <= datas.record.length) {
                    searchMessage.innerHTML = ''
                    writeResult(demandId, datas)
                }
                else {
                    searchMessage.innerHTML = 
                    `Please enter an ID between 1 and ${datas.record.length}`
                    tableBodyContainer.insertAdjacentHTML('afterbegin', '<tr><th>Error</th></tr>')
                } 
            }
            else {
                console.log('Some error occured...')
                searchButton.insertAdjacentHTML('afterend', '<span class="error-message">Page not found</span>')
            }
        }

        xhr.send() 
    }

    let writeResult = (demandId, datas) => {
        let resId
        let id = demandId - 1

        resId = `<tr>
                    <th>${datas.record[id].demandId}</th>
                    <th>${datas.record[id].firstName}</th>
                    <th>${datas.record[id].lastName}</th>
                    <th>${datas.record[id].registration}</th>
                </tr>`
        tableBodyContainer.insertAdjacentHTML('afterbegin', resId)
    }

    searchButton.addEventListener("click", () => {
        let demandId = document.getElementById("search-id").value
        searchDemand(demandId)
    })    
})

