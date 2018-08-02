//
// C&R timesheet scripts
//
"use strict"

//function to pupulate lunches
function populateLunches(){
    for(var i = 1; i <= 10; i++){
        document.getElementById("lunch"+i).value = 30;
    }
}

//function to calculate totals
function calculateTotals(){
    var temp = 0;
    for(var i = 1; i <= 10; i++){
        var end = document.getElementById("end"+i).valueAsNumber;
        var start = document.getElementById("start"+i).valueAsNumber;
        var lunch = document.getElementById("lunch"+i).value;
        document.getElementById("total"+i).value = ((end - start) / 3600000) - (lunch/60);
        console.log(i);
       
    }
}
//function to create matrix of data
function arrayData(){
    var bigArray = [];
    var smallArray = [];
    for( var row = 1; row <= 10; row++){
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

//function to populate data from stored matrix

//function to print array as test
function printArray(array){
    for(var i = 0; i < array.length; i++){
        console.log(array[i]);
    }
}

//event listeners
var button1 =   document.getElementById("button1");
var button2 =   document.getElementById("button2");
    
if (window.addEventListener) {
    window.addEventListener("load", populateLunches, false);
    window.addEventListener("load", calculateTotals, false);
    window.addEventListener("input", calculateTotals, false);
    button1.addEventListener("click", arrayData, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", populateLunches, false);
    window.attachEvent("onload", calculateTotals);
    window.attachEvent("input", calculateTotals);
}

