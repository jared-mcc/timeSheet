//
// C&R timesheet scripts
//
"use strict"

//function to pupulate lunches
function populateLunches(){
    for(var i = 1; i <= 14; i++){
        document.getElementById("lunch"+i).value = 30;
    }
}

//function to populated dates based off of one entered
function populateDates(){
    var filled;

    //find a filled one
    for(var i = 0; i <= 14; i++){
        if(document.getElementById("date"+ i).valueAsNumber != ""){
            filled = i;
            console.log(getElementById("date"+i).valueAsNumber);
        }
    }

    //caculate others based off of filled
    for(var i = 0; i <= 14; i++){
        
    }    
}

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
        smallArray[5] = document.getElementById("total" + row).value;
        bigArray[row-1] = smallArray;
    }
    printArray(bigArray);
}

//funciton to stringify for storage

//function to populate data from stored matrix

//function to print array as test
function printArray(array){
    for(var i = 0; i < array.length; i++){
        console.log(array[i]);
        console.log(document.getElementById("date1").value);
    }
}

//event listeners
var button1 =   document.getElementById("button1");
var button2 =   document.getElementById("button2");
    
if (window.addEventListener) {
    window.addEventListener("load", populateLunches, false);
    window.addEventListener("load", calculateTotals, false);
    window.addEventListener("load", checkOffs, false);
    window.addEventListener("input", calculateTotals, false);
    window.addEventListener("input", checkOffs, false);
    button1.addEventListener("click", arrayData, false);
}
else if (window.attachEvent) {
    window.attachEvent("input", checkOffs);
    window.attachEvent("onload", checkOffs);
    window.attachEvent("onload", populateLunches);
    window.attachEvent("onload", calculateTotals);
    window.attachEvent("input", calculateTotals);
    button1.attachShadow("onclick", arrayData);
}

