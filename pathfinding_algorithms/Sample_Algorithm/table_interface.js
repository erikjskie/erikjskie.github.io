function createTable(cols, rows){
    let td;
    let tr;
    for(let i = 0; i < 50; i++){
        td = document.createElement("td");
        // for(let j = 0; j < rows; j++){
        //     tr = document.createElement("tr");
        //     td.appendChild(tr);
        // }
        document.getElementById("grid").appendChild(td);
    }
}


