const tableBody = document.getElementById("tableBody");
const start = document.getElementById("startBtn");



async function getUsers(){
    try {
        url = "https://reqres.in/api/users?delay=3";
        const dataJsn = localStorage.getItem("data");
        let data;
        
        if(!dataJsn){
            data =  await getDelayedApi(url);
            console.log(data);
        }else{
            if(timePassed()){
                data = await getDelayedApi(url);
            }else{
                console.log(JSON.parse(dataJsn));
                data = JSON.parse(dataJsn);
                console.log(data.data);
                data = data.data;
            }
        }
        
    printData(data);
       
        
        
    } catch (error) {
        console.log(error);
    }
    
}

async function getDelayedApi(url){
    const responseJson = await fetch(url);
    const response = await responseJson.json();
    localStorage.setItem("data", JSON.stringify(response));
    localStorage.setItem("time", new Date());
    console.log(response)
    console.log(response.data);
    data = response.data;
    return data;
}

start.addEventListener("click", getUsers);
clear.addEventListener("click", ()=> {
    localStorage.removeItem("data");
    localStorage.removeItem("time");
});


function getDataTable({id,email, first_name, last_name, avatar}){
    let tbSentences = 
    `   <tr>
    <th scope="row">${id}</th>
            <td>${first_name}</td>
            <td>${last_name}</td>
            <td>${email}</td>
            <td><img style="border-radius: 50%" src="${avatar}"></td>
        </tr>`;

    return tbSentences;
}

function printData(data){
    let dataTables = "";
    for(let i =0; i< data.length; i++){
        dataTables += getDataTable(data[i]);
    }
    tableBody.innerHTML = dataTables;

    console.log(dataTables);
}



function timePassed() {
    const timeLocalStorage = localStorage.getItem("time");
    const timeLsDate = new Date(timeLocalStorage);
    const currentTime = new Date();
    const timePased = currentTime - timeLsDate;
    const timePasedMinutes = (timePased / 1000) / 60;
    let oneMinutePlus = false;
    if(timePasedMinutes >1){
        oneMinutePlus = true;
    }

    return oneMinutePlus;
}

