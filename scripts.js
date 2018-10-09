//
// C&R timesheet scripts
//
"use strict"

//function to populated dates based off of one entered
function setDate(){
    
    var i = (this.id === "date0") ? (1) : (14);
    var x = (this.id === "date0") ? (1) : (-1);
    var end = (this.id === "date0") ? (15) : (0);
    var tomorrow = (this.id === "date0") ? new Date(document.getElementById("date0").value) : new Date(document.getElementById("date15").value);
    if(this.id === "date15")
        tomorrow.setDate(tomorrow.getDate()+2);

    while(i !== end){
        tomorrow.setDate( tomorrow.getDate() + x );
        var dateBuffer = (tomorrow.getDate() >= 10) ? ("") : ("0");
        var monthBuffer = (tomorrow.getMonth() >= 9) ? ("") : ("0");
        document.getElementById("date" + i).value = String(tomorrow.getFullYear()) + "-" + monthBuffer + String(tomorrow.getMonth() + 1) + "-" + dateBuffer + String(tomorrow.getDate());
        document.getElementById("off"+ i).checked = (tomorrow.getDay() === 5 || tomorrow.getDay() === 6) ? true : false;

        i += x;
    }
    if(this.id === "date0")
        document.getElementById("date15").value = document.getElementById("date14").value;
    else
        document.getElementById("date0").value = document.getElementById("date1").value;
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
        document.getElementById("total"+i).value = Number(((end - start) / 3600000) - (lunch/60));       
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
        bigArray.push(smallArray);
        smallArray = [];
    }
    return bigArray;

}

//funciton to stringify for storage
function storeData(){
    localStorage["userDatas"] = JSON.stringify(arrayData());
    localStorage["userName"] = JSON.stringify(document.getElementById("employeeName").value);
}
//function to populate data from stored matrix
function populateData(){
   
    var userData = JSON.parse(localStorage.getItem('userDatas'));
    document.getElementById("employeeName").value = JSON.parse(localStorage.getItem('userName'));
  for(var row = 1; row <= 14; row++){
        document.getElementById("date" + row).value = userData[row-1][0];
        document.getElementById("location" + row).value = userData[row-1][1];
        document.getElementById("start" + row).value = userData[row-1][2];
        document.getElementById("end" + row).value = userData[row-1][3];
        document.getElementById("lunch" + row).value = Number(userData[row-1][4]);
        document.getElementById("off"+ row).checked = userData[row-1][5];
  }
  document.getElementById("date0").value = document.getElementById("date1").value;
  document.getElementById("date15").value = document.getElementById("date14").value;
}

//function to clear array and populate initial
function cleanArray(){
    for(var row = 1; row <= 14; row++){
        localStorage.clear();
        document.getElementById("date" + row).value = "";
        document.getElementById("location" + row).value = "";
        document.getElementById("start" + row).value = "08:00";
        document.getElementById("end" + row).value = "16:30";
        document.getElementById("lunch" + row).value = "30";
        document.getElementById("off" + row).checked = false;
    }
    document.getElementById("employeeName").value = "";
    document.getElementById("date0").value = "";
    document.getElementById("date15").value = "";
    storeData();
    checkOffs();
    calculateTotals();
}

//function to initiate popup for clear
function cleanPop(){

    //display block alert div
    document.getElementById("cancelButton").style.display = "block";
    document.getElementById("clearButton").style.display = "block";
    document.getElementById("button2").style.display = "none";
}

//clear back to normal on "cancel" of clear
function cancelChoice(){
    //display none block alert div
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("clearButton").style.display = "none";
    document.getElementById("button2").style.display = "block";
}

// run clean array then clear back to normal on "cancel" of clear
function cleanChoice(){
    cleanArray();

    //display none block alert div
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("clearButton").style.display = "none";
    document.getElementById("button2").style.display = "block";
}

//event listeners
var button1 =   document.getElementById("button1");
var button2 =   document.getElementById("button2");
var cancelButton = document.getElementById("cancelButton");
var clearButton = document.getElementById("clearButton");
var startDate = document.getElementById("date0");
var endDate = document.getElementById("date15");
    
    window.addEventListener("load", populateData, false);
    window.addEventListener("load", calculateTotals, false);
    window.addEventListener("load", checkOffs, false);
    window.addEventListener("input", calculateTotals, false);
    window.addEventListener("input", checkOffs, false);
    window.addEventListener("input", storeData, false);
    startDate.addEventListener("input", setDate, false);
    endDate.addEventListener("input", setDate, false);
    button2.addEventListener("click", cleanPop, false);
    clearButton.addEventListener("click", cleanChoice, false);
    cancelButton.addEventListener("click", cancelChoice, false);


