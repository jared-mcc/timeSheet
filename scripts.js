//
// C&R timesheet scripts
//
"use strict"

//function to populated dates based off of one entered


//function to set everything to zero if "off"
function checkOffs(){
    var bigTotal = 0;
    for(var i = 1; i <= 14; i++){
        if(document.getElementById("off"+i).checked){
            document.getElementById("date"+i).style.color = "darkgrey";
            document.getElementById("date"+i).style.backgroundColor = "grey";
            document.getElementById("location"+i).style.color = "darkgrey";
            document.getElementById("location"+i).style.backgroundColor = "grey";
            document.getElementById("start"+i).style.color = "darkgrey";
            document.getElementById("start"+i).style.backgroundColor = "grey";
            document.getElementById("end"+i).style.color = "darkgrey";
            document.getElementById("end"+i).style.backgroundColor = "grey";
            document.getElementById("lunch"+i).style.color = "darkgrey";
            document.getElementById("lunch"+i).style.backgroundColor = "grey";
            document.getElementById("total"+i).style.color = "darkgrey";
            document.getElementById("total"+i).style.backgroundColor = "grey";
            document.getElementById("total"+i).value = 0;
        }
        else{
            document.getElementById("date"+i).style.color = "black";
            document.getElementById("date"+i).style.backgroundColor = "white";

            document.getElementById("location"+i).style.color = "black";
            document.getElementById("location"+i).style.backgroundColor = "white";

            document.getElementById("start"+i).style.color = "black";
            document.getElementById("start"+i).style.backgroundColor = "white";

            document.getElementById("end"+i).style.color = "black";
            document.getElementById("end"+i).style.backgroundColor = "white";

            document.getElementById("lunch"+i).style.color = "black";
            document.getElementById("lunch"+i).style.backgroundColor = "white";

            document.getElementById("total"+i).style.color = "black";
            document.getElementById("total"+i).style.backgroundColor = "white";
        }
        bigTotal += Number(document.getElementById("total"+i).value);
        document.getElementById("biggestTotal").value = bigTotal;
    }
}

//function to calculate totals
function calculateTotals(){
    var temp = 0;
    for(var i = 1; i <= 14; i++){
        var end = document.getElementById("end"+i).valueAsNumber;
        var start = document.getElementById("start"+i).valueAsNumber;
        var lunch = document.getElementById("lunch"+i).value;
        document.getElementById("total"+i).value = ((end - start) / 3600000) - (lunch/60);       
    }
}
//function to create matrix of data
function arrayData(){
    var bigArray = [];
    var smallArray = [];
    for( var row = 1; row <= 14; row++){
        smallArray[0] = document.getElementById("date" + row).value;
        smallArray[1] = document.getElementById("location" + row).value;
        smallArray[2] = document.getElementById("start" + row).value;
        smallArray[3] = document.getElementById("end" + row).value;
        smallArray[4] = document.getElementById("lunch" + row).value;
        smallArray[5] = document.getElementById("off"+ row).checked;
        bigArray[row-1] = smallArray;
        smallArray = [];
    }
    return bigArray;
}

//funciton to stringify for storage
function storeData(){
    var userData = arrayData();
    localStorage["userData"] = JSON.stringify(userData);
}
//function to populate data from stored matrix
function populateData(){
    var userData = JSON.parse(localStorage["userData"]);

    for(var row = 1; row <= 14; row++){
        for(var col = 0; col < 6; col++){
            document.getElementById("date" + row).value = userData[row-1][col];
            document.getElementById("location" + row).value = userData[row-1][col];
            document.getElementById("start" + row).value = userData[row-1][col];
            document.getElementById("end" + row).value = userData[row-1][col];
            document.getElementById("lunch" + row).value = userData[row-1][col];
            document.getElementById("off"+ row).checked = userData[row-1][col];
        }
    }
}


//function to clear array and populate initial
function cleanArray(){
    for(var row = 1; row <= 14; row++){
        localStorage.clear();
        document.getElementById("date" + row).value = "";
        document.getElementById("location" + row).value = "";
        document.getElementById("start" + row).value = "08:00";
        document.getElementById("end" + row).value = "04:30";
        document.getElementById("lunch" + row).value = 30;
        if(row === 2 || row === 3 || row === 9 || row === 10){
            document.getElementById("off"+ row).checked = "true";
        }
        else{
            document.getElementById("off"+ row).checked = "false";
        }
    }
    populateData();
    calculateTotals();
}


//event listeners
var button1 =   document.getElementById("button1");
var button2 =   document.getElementById("button2");
    
    window.addEventListener("load", populateData, false);
    window.addEventListener("load", calculateTotals, false);
    window.addEventListener("load", checkOffs, false);
    window.addEventListener("input", calculateTotals, false);
    window.addEventListener("input", checkOffs, false);
    window.addEventListener("input", populateData, false);
    button1.addEventListener("click", storeData, false);
    button2.addEventListener("click", cleanArray, false);


