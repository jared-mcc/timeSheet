//
// C&R timesheet scripts
//
"use strict"

//function to populated dates based off of one entered
function setDate(){
    document.getElementById("blackout").style.display = "none";
    document.getElementById("welcome").style.display = "none";
    
    startDate = document.getElementById("date0");
    endDate = document.getElementById("date15");

    if(typeof(this) != 'undefined'){
        var i = (this.id === "date0") ? (1) : (14);
        var x = (this.id === "date0") ? (1) : (-1);
        var end = (this.id === "date0") ? (15) : (0);
        var tomorrow = (this.id === "date0") ? new Date(startDate.value) : new Date(endDate.value);
        if(this.id === "date15")
            tomorrow.setDate(tomorrow.getDate()+2);
    }
    else{
        if(startDate.value != ""){
            var i = 1;
            var x = 1;
            var end = 15;
            var tomorrow = new Date(startDate.value)
        }
        else if(endDate.value != ""){
            var i = 14;
            var x = -1;
            var end = 0;
            var tomorrow = new Date(endDate.value);
        } 
    }
     
    for(var y = 1; y <=14; y++){
        document.getElementById("off"+y).checked = false;
    }

    var settings = JSON.parse(localStorage.getItem("settings"));
    localStorage["settings"] = JSON.stringify(settings);

    while(i !== end){
        tomorrow.setDate( tomorrow.getDate() + x );
        var dateBuffer = (tomorrow.getDate() >= 10) ? ("") : ("0");
        var monthBuffer = (tomorrow.getMonth() >= 9) ? ("") : ("0");
        document.getElementById("date" + i).value = String(tomorrow.getFullYear()) + "-" + monthBuffer + String(tomorrow.getMonth() + 1) + "-" + dateBuffer + String(tomorrow.getDate());
    
        for(var j = 0; j <= 6; j++){
            if(tomorrow.getDay() === settings[4][j])
               document.getElementById("off"+ i).checked = true;
        }
            
        var day = "";
        switch(tomorrow.getDay()){
            case 0:
                day = "Su";
                break;
            case 1:
                day = "M";
                break;
            case 2:
                day = "T";
                break;
            case 3:
                day = "W";
                break;     
            case 4:
                day = "Th";
                break;
            case 5:
                day = "F";
                break;
            case 6:
                day = "St";
                break;
        }//end switch
         
        document.getElementById("day" + i).innerText = day;
        i += x;
    }

    startDate.value = document.getElementById("date1").value;
    endDate.value = document.getElementById("date14").value;
    
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
            
            document.getElementById("day" + i).style.color= "darkgrey";
            document.getElementById("day" + i).style.backgroundColor= "grey";

            document.getElementById(i).style.backgroundColor = "grey";

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

            document.getElementById("day" + i).style.color= "#516BEC";
            document.getElementById("day" + i).style.backgroundColor= "white";

            document.getElementById(i).style.backgroundColor = "white";


        }

        changeBackgrounds();
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
        smallArray[5] = document.getElementById("off" + row).checked;
        smallArray[6] = document.getElementById("day" + row).innerText;
        bigArray.push(smallArray);
        smallArray = [];
    }
    return bigArray;

}

//funciton to stringify for storage
function storeData(){
    localStorage["userDatas"] = JSON.stringify(arrayData());
    localStorage["userName"] = JSON.stringify(document.getElementById("employeeName").value);
   // localStorage["settings"] = JSON.stringify(document.get)
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
        document.getElementById("day" + row).innerText = userData[row-1][6];
  }
  document.getElementById("date0").value = document.getElementById("date1").value;
  document.getElementById("date15").value = document.getElementById("date14").value;
}

//function to clear array and populate initial
function cleanArray(){

   var settings = JSON.parse(localStorage.getItem("settings"));
    
    for(var row = 1; row <= 14; row++){
        localStorage.clear();
        document.getElementById("date" + row).value = "";
        document.getElementById("location" + row).value = settings[0];
        document.getElementById("start" + row).value = settings[1];
        document.getElementById("end" + row).value = settings[2];
        document.getElementById("lunch" + row).value = settings[3];
        document.getElementById("off" + row).checked = false;
    }
    document.getElementById("employeeName").value = "";
    document.getElementById("date0").value = "";
    document.getElementById("date15").value = "";
    
    localStorage["settings"] = JSON.stringify(settings);

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

function firstTime(){
    if(!localStorage.getItem("userDatas")){
        document.getElementById("blackout").style.display = "block";
        document.getElementById("welcome").style.display = "block"; 
        var settings = ["","08:00","16:30","30",[0,7,7,7,7,7,6]];
        localStorage["settings"] = JSON.stringify(settings);
        cleanArray();
    }

    if(!localStorage.getItem("settings")){
       var settings = ["","08:00","16:30","30",[0,7,7,7,7,7,6]];
       localStorage["settings"] = JSON.stringify(settings);
    }

}

function welcome(){
    document.getElementById("welcomeh2").style.display = "none";
    document.getElementById("welcomeh3").style.display = "none";
    for( var i = 0; i < document.getElementsByClassName("para").length; i++){
         document.getElementsByClassName("para")[i].style.display = "none";
    }
    document.getElementById("blackout").style.transform = "translateY(4vh)";
    document.getElementById("welcome").style.transform = "translateY(3vh)";
    document.getElementById("welcome").style.height = "15vh";
    document.getElementsByClassName("pointy")[0].style.transform = "rotate(45deg)";
    document.getElementById("paraish").style.opacity = "1";
    document.getElementById("paraish").style.display = "block";
}

function changeBackgrounds(){
    for(var i = 2; i <= 14; i += 2){
        if(document.getElementById(i).style.backgroundColor != "grey"){
            document.getElementById("day" + i).style.backgroundColor = "#DCECF7";
            document.getElementById("total" + i).style.backgroundColor = "#DCECF7";
            document.getElementById("date" + i).style.backgroundColor = "#DCECF7";
            document.getElementById("location" + i).style.backgroundColor = "#DCECF7";
            document.getElementById("start" + i).style.backgroundColor = "#DCECF7";
            document.getElementById("end" + i).style.backgroundColor = "#DCECF7";
            document.getElementById("lunch" + i).style.backgroundColor = "#DCECF7";
            document.getElementById(i).style.backgroundColor = "#DCECF7";
        }
    }
}

function settingsWindow(){
   
   var blackout = document.getElementById("blackout");
   var toggle =  (document.getElementById("settingsDiv").style.display === "grid") ? 0 : 1;

    blackout.style.display = (toggle === 1) ? "block" : "none";
    blackout.style.visibility = (toggle === 1) ? "visible" : "hidden";
    blackout.style.transform = (toggle === 1) ? "translateY(-6vh)" : "translateY(-6vh)";
    document.getElementById("settingsDiv").style.display = (toggle === 1) ? "grid" : "none";
    document.getElementById("settingsPointy").style.transform = (toggle === 1) ? "rotate(45deg)" : "rotate(0)";
}

//function to make sure the user wants to clear
function applyAsk(){
    document.getElementById("applySettings").style.display = "block";
    document.getElementById("cancelSetting").style.display = "block";
    document.getElementById("askSetting").style.display = "none";
}

function applyCancel(){
    document.getElementById("applySettings").style.display = "none";
    document.getElementById("cancelSetting").style.display = "none";
    document.getElementById("askSetting").style.display = "block";
}

function applySettings(){
    //Compile setting things into array
    var previousSettings = JSON.parse(localStorage.getItem("settings"));
    var setting =["","08:00","16:30","30",[0,7,7,7,7,7,6]];
    setting[0] = document.getElementById("locationSetting").value;
    setting[1] = document.getElementById("startSetting").value;
    setting[2] = document.getElementById("endSetting").value;
    setting[3] = document.getElementById("lunchSetting").value;

    for(var i = 0; i <= 6; i++){
        if(document.getElementById("offS"+i).checked)
            setting[4][i] = i;
        else
            setting[4][i] = 7;
    
    }

    document.getElementById("applySettings").style.display = "none";
    document.getElementById("cancelSetting").style.display = "none";
    document.getElementById("askSetting").style.display = "block";
    
    localStorage["settings"] = JSON.stringify(setting);
    setDate();
    cleanAfterSettings(previousSettings);
    settingsWindow();
}

function cleanAfterSettings(previousSettings){
    var settings = JSON.parse(localStorage.getItem("settings"));
    
    for(var row = 1; row <= 14; row++){
        if(document.getElementById("location"+ row).value === previousSettings[0])
            document.getElementById("location" + row).value = settings[0];
        if(document.getElementById("start"+ row).value === previousSettings[1])
            document.getElementById("start" + row).value = settings[1];
        if(document.getElementById("end"+ row).value === previousSettings[2])
            document.getElementById("end" + row).value = settings[2];
        if(document.getElementById("lunch"+ row).value === previousSettings[3])
            document.getElementById("lunch" + row).value = settings[3];
    }
    localStorage["settings"] = JSON.stringify(settings);

    storeData();
    checkOffs();
    calculateTotals();
}

function setSettings(){
    var settings = JSON.parse(localStorage.getItem("settings"));

    document.getElementById("locationSetting").value = settings[0];
    document.getElementById("startSetting").value = settings[1];
    document.getElementById("endSetting").value = settings[2];
    document.getElementById("lunchSetting").value = settings[3];

    for(var i = 0; i <= 6; i++){
        if(settings[4][i] != 7)
            document.getElementById("offS"+i).checked = true;
    }

    localStorage["settings"] = JSON.stringify(settings);

}

const preObject = document.getElementById("object");
const dbRefObject = firebase.database().ref().child('object');
dbRefObject.on('value', snap => console.log(snap.val()));

//event listeners
var welcomeButton =   document.getElementById("welcomeButton");
var button2 =   document.getElementById("button2");
var cancelButton = document.getElementById("cancelButton");
var clearButton = document.getElementById("clearButton");
var startDate = document.getElementById("date0");
var endDate = document.getElementById("date15");
var settingsButton = document.getElementById("settingsButton");
var applySetting =  document.getElementById("applySettings");
var cancelSetting = document.getElementById("cancelSetting");
var askSetting = document.getElementById("askSetting");

    
    window.addEventListener("load", firstTime, false);
    window.addEventListener("load", populateData, false);
    window.addEventListener("load", calculateTotals, false);
    window.addEventListener("load", checkOffs, false);
    window.addEventListener("load", changeBackgrounds,false);
    window.addEventListener("load", setSettings, false);
    window.addEventListener("input", calculateTotals, false);
    for(var i = 1; i <= 14; i++)
        document.getElementById("off" + i).addEventListener("click", calculateTotals);
    window.addEventListener("input", checkOffs, false);
    for(var i = 1; i <= 14; i++)
        document.getElementById("off" + i).addEventListener("click", checkOffs );
    window.addEventListener("input", storeData, false);
    for(var i = 1; i <= 14; i++)
        document.getElementById("off" + i).addEventListener("click", storeData );
    startDate.addEventListener("input", setDate, false);
    endDate.addEventListener("input", setDate, false);
    welcomeButton.addEventListener("click", welcome, false);
    button2.addEventListener("click", cleanPop, false);
    clearButton.addEventListener("click", cleanChoice, false);
    cancelButton.addEventListener("click", cancelChoice, false);
    settingsButton.addEventListener("click", settingsWindow, false);
    askSetting.addEventListener("click", applyAsk, false);
    cancelSetting.addEventListener("click", applyCancel, false);
    applySetting.addEventListener("click", applySettings, false);


