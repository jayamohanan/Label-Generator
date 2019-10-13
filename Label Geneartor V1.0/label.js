document.addEventListener('DOMContentLoaded', function () {
    //Tab Buttons
    openActiveTab();
    document.getElementById("dataloaderButton").addEventListener("click", function(){  openAction(event, "dataloader");  });
    document.getElementById("deploymentButton").addEventListener("click",  function(){  openAction(event, "deployment");  } );  
    document.getElementById("ezcommitButton").addEventListener("click", function(){ openAction(event, "ezcommit");   });
    document.getElementById("addonsButton").addEventListener("click", function(){ openAction(event, "addons");   });
    document.getElementById("settingsButton").addEventListener("click", function(){ openAction(event, "settings");   });
    
    //Data Loader   
    DLStoreRetrieve();
    document.getElementById("saveData").addEventListener("click", SaveData);
    document.getElementById("clearData").addEventListener("click", ClearData);
    document.getElementById("copyExtractLabel").addEventListener("click", CopyExtractLabel);
    document.getElementById("copyLabel").addEventListener("click", CopyLabel);
    document.getElementById("copyBoxFolder").addEventListener("click", CopyBoxFolderName);
    document.getElementById("copyChatterComment").addEventListener("click", CopyChatterComment);
    /*document.getElementById("copyALSubject").addEventListener("click", CopyALSubject);
    document.getElementById("copyALResolution").addEventListener("click", CopyALResolution);*/
    document.getElementById("CompleteDataAL").addEventListener("click", CopyCompleteDataAL);
    document.getElementById("CompleteDataEA").addEventListener("click", CopyCompleteDataEA);

    //Deployment
    DepStoreRetrieve();
    document.getElementById("depSaveData").addEventListener("click", DepSaveData);
    document.getElementById("depClearData").addEventListener("click", DepClearData);
    document.getElementById("copyDepLabel").addEventListener("click", CopyDepLabel);
    document.getElementById("copyDepChatterComment").addEventListener("click", CopyDepChatterComment);
    /*document.getElementById("copyDepALSubject").addEventListener("click", CopyDepALSubject);
    document.getElementById("copyDepALResolution").addEventListener("click", CopyDepALResolution);*/
    document.getElementById("CompleteDeploymentAL").addEventListener("click", CopyCompleteDeploymentAL);
    document.getElementById("CompleteDeploymentEA").addEventListener("click", CopyCompleteDeploymentEA);

    //EZ Commit
    EZStoreRetrieve();
    document.getElementById("ezSaveData").addEventListener("click", EZSaveData);
    document.getElementById("ezClearData").addEventListener("click", EZClearData);
    document.getElementById("copyEZCommitLabel").addEventListener("click", CopyEZLabel);
    /*document.getElementById("copyEZALSubject").addEventListener("click", CopyEZALSubject);
    document.getElementById("copyEZALResolution").addEventListener("click", CopyEZALResolution);*/
    document.getElementById("CompleteCommitAL").addEventListener("click", CopyCompleteCommitAL);
    document.getElementById("CompleteCommitEA").addEventListener("click", CopyCompleteCommitEA);

    //Addons
    document.getElementById("metadataSearch").addEventListener("click", FindMetadata);

    //settings
    SettingsStoreRetrieve();
    document.getElementById("saveUserName").addEventListener("click", SaveSettings);
});

successErrorFieldFormatValid = true;

var metadata = {"lightning component":"Aura Definition Bundle",
    "custom object tab":"Custom Tab",
    "custom setting":"Custom Object",
    "email alert":"WorkFlow Alert",
    "email folder":"Email Template",
    "field":"Custom Field",
    "field upadate":"WorkFlow Field Update",
    "label":"Custom Label",
    "layout":"Layout",
    "object":"Custom Object",
    "page layout":"Layout",
    "record type":"Record Type",
    "role":"Role",
    "static resource":"Static Resource",
    "visualforce page":"Apex Page",
    "workflow email alert":"Workflow Alert",
    "workflow rule":"Workflow Rule",
    "criteria-based sharing rule":"SharingCriteriaRule",
    "custom button":"WebLink",
    "link":"WebLink",
    "custom app":"Custom Application",
    "visualforce component":"Apex Component",
    "flow version":"Flow Definition",
    "custom report type":"Report Type",
    "aura component bundle":"Aura Definition Bundle",
    "remote site":"Remote Site Setting",
    "application":"Custom Application",
    "process builder":"Flow Definition",
    "component":"Aura Definition Bundle",
    "visualforce":"Apex Page",
    "classic email templates":"Email templates",
    "folder":"Email templates",
    "lightning record Page":"Flexi Page",
    "report folder":"Report",
    "action":"Quick Action",
    'path':"Path Assistant",
    "Lightning Page":"Flexi Page"

    };

{//Data Loder Function
function CopyExtractLabel(){
    Initialize();
    if(!IfAllPresent([reqNo, orgName, objectName])){
        alert('Some required fields missing!');
        return;
    }
    var extractLabelValue = reqNo+ " " + orgName + " " + "Production Extract " + objectName + " Bkp" + " " + clock;
    var outputTextarea  = document.getElementById("outputTextarea");
    outputTextarea.value = extractLabelValue;
    outputTextarea.select();
    document.execCommand("copy");
    window.close();
    
}  
function CopyLabel(){
    Initialize();
    if(!IfAllPresent([reqNo, orgName, objectName, operation])){
        alert('Some required fields missing!');
        return;
    }
    var labelValue = reqNo + " " + orgName + " Production " + operation + " " + objectName + " " +clock;
    var outputTextarea  = document.getElementById("outputTextarea");
    outputTextarea.value = labelValue;
    outputTextarea.select();
    document.execCommand("copy");
    window.close();
}
function CopyBoxFolderName(){
    Initialize();
    if(!IfAllPresent([reqNo, orgName, objectName])){
        alert('Some required fields missing!');
        return;
    }
    var boxName = reqNo+ " " + orgName + " " + "Production" + " " + objectName + " " +clock;
    var outputTextarea  = document.getElementById("outputTextarea");
    outputTextarea.value = boxName;
    outputTextarea.select();
    document.execCommand("copy");
    window.close();
}
function CopyChatterComment(){
    Initialize();
    if(!IfAllPresent([user, objectName, operation, boxURL]) && !IfAllPresent([user, objectName, operation, successErrorCombined])){
        alert('Some required fields missing!');
        return;
    }
    if(!successErrorFieldFormatValid)
    {
        return;
    }
    var outputTextarea  = document.getElementById("outputTextarea");
    outputTextarea.value = "Hi @" + user + "\n\n";

    if(!successErrorCombined){
    outputTextarea.value += "The given records are " + PastTensePlusPreposition() + " " + objectName + " object." + "\n";
    outputTextarea.value += "Box Folder link for success files:-" + "\n";
    outputTextarea.value += boxURL + "\n";
    outputTextarea.value += "Also attaching success files in notes and attachment section.\n"
    }
    else if(successErrorCombined){
        if(successRecords != 0){
        outputTextarea.value += "Out of " + totalRecords + " records given, " + successRecords+" records are successfully "+PastTensePlusPreposition()+" "+ objectName +" object while "+ errorRecords+" records failed with errors.\n";
        outputTextarea.value += "Attaching Success and Error files in Note's and Attachment section.\n";
        }
        else{
            outputTextarea.value += "Out of " + totalRecords + " records given, all the records failed with errors.\n";
            outputTextarea.value += "Attaching Success and Error files in Note's and Attachment section.\n";
        }
    }
    outputTextarea.value += "Please verify and confirm." + "\n";
    outputTextarea.value += "cc @Soumya Gampa@Poornima US";
    outputTextarea.select();
    document.execCommand("copy");
    window.close();
}
function CopyALSubject(){
    Initialize();
    if(!IfAllPresent([objectName, operation, boxURL])){
        alert('Some required fields missing!');
        return;
    }
    var outputTextarea  = document.getElementById("outputTextarea");
    outputTextarea.value = "1. Verify the incident number on CCSN for the request.\n";
    outputTextarea.value += "2. Export " + objectName + " object for back up.\n";
    outputTextarea.value += "3. " + operation +" the records provided in the request.\n";
    outputTextarea.value += "Box Folder:-\n";
    outputTextarea.value += boxURL;
    outputTextarea.select();
    document.execCommand("copy");
    return outputTextarea.value;
}
function CopyALResolution(){
    Initialize();
    if(!IfAllPresent([objectName, operation, boxURL])){
        alert('Some required fields missing!');
        return;
    }
    var outputTextarea  = document.getElementById("outputTextarea");
    outputTextarea.value = "1. Verified the incident number on CCSN for the request.\n";
    outputTextarea.value += "2. Exported " + objectName + " object for back up.\n";
    outputTextarea.value += "3. The given records are " + PastTensePlusPreposition() + " " + objectName + " object." + "\n";
    outputTextarea.value += "Box Folder:-\n";
    outputTextarea.value += boxURL;
    outputTextarea.select();
    document.execCommand("copy");
    return outputTextarea.value;
}

function Initialize()
{ 
    reqNo = document.getElementById("reqNo").value;
    reqNo = "RI-0" + reqNo;
    orgName = document.getElementById("orgName").value;
    orgName = orgName.toUpperCase();
    objectName = document.getElementById("objectName").value;
    operation = document.getElementById("operation").value;
    user = document.getElementById("user").value;
    boxURL = document.getElementById("boxURL").value;
    successErrorCombined = document.getElementById('successError').value;
    if(successErrorCombined != ""){
    if(successErrorCombined.search("/") != -1)
    {
    successErrorArray = successErrorCombined.split("/");
    successRecords = successErrorArray[0];
    errorRecords = successErrorArray[1];
    totalRecords = parseInt(successRecords) + parseInt(errorRecords); 
    }
    else{
        alert("Enter the Success and Error numbers seperated by /(forward slash)!!!!");
        successErrorFieldFormatValid = false;
    }
    }

    CalculateClock();
}
function Filter(input)
{
    if(input < 10){
        input = "0" + input;
    }
    return input.toString();
}
function GetTimezone(){
    var timeZone;
    if(date.getTimezoneOffset() == -330)
    {
        timeZone = "IST";
    }
    else if(date.getTimezoneOffset() == 300)
    {
        timeZone = "EST";
    }
    else{
        timeZone = "undefined";
    }
    return timeZone;
}
function PastTensePlusPreposition(){
    var PastTensePlusPreposition;
    switch(operation){
        case "Insert":
        PastTensePlusPreposition = "inserted into";
        break;
        case "Update":
        PastTensePlusPreposition = "updated on";
        break;
        case "Delete":
        PastTensePlusPreposition = "deleted from";
        break;
    }
    return PastTensePlusPreposition;  
}
function DLStoreRetrieve(){
    //Retrieve value from storage
    chrome.storage.sync.get(['reqNoS', 'orgNameS', 'objectNameS', 'operationS', 'userS', 'boxURLS','successErrorS'], function(userInput){
    if(userInput.reqNoS){document.getElementById("reqNo").value = userInput.reqNoS;
    }
    if(userInput.orgNameS){document.getElementById("orgName").value = userInput.orgNameS;
    }
    if(userInput.objectNameS){document.getElementById("objectName").value = userInput.objectNameS;
    }
    if(userInput.operationS){document.getElementById("operation").value = userInput.operationS;
    }
    if(userInput.userS){document.getElementById("user").value = userInput.userS;
    }
    if(userInput.boxURLS){document.getElementById("boxURL").value = userInput.boxURLS;}
    if(userInput.successErrorS){document.getElementById("successError").value = userInput.successErrorS;}
    
});
}
function SaveData(){
    chrome.storage.sync.set({
    'reqNoS':document.getElementById('reqNo').value,
    'orgNameS':document.getElementById('orgName').value,
    'objectNameS':document.getElementById('objectName').value,
    'operationS':document.getElementById('operation').value,
    'userS':document.getElementById('user').value,
    'boxURLS':document.getElementById('boxURL').value,
    'successErrorS':document.getElementById('successError').value

    });
}
function ClearData(){
    chrome.storage.sync.set({
        'reqNoS':"",
        'orgNameS':"",
        'objectNameS':"",
        'operationS':"",
        'userS':"",
        'boxURLS':"",
        'successErrorS':""
        });
    document.getElementById('reqNo').value = "";
    document.getElementById('orgName').value = "";
    document.getElementById('objectName').value = "";
    document.getElementById('operation').value = "Extract";
    document.getElementById('user').value = "";
    document.getElementById('boxURL').value = "";
    document.getElementById('successError').value = "";
}
function CopyCompleteDataAL(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(CopyALSubject() && CopyALResolution()){
        chrome.tabs.sendMessage(tabs[0].id, {id: 1, subject:CopyALSubject(), resolution: CopyALResolution(),assignedTo:userProfileName},function(response){
            if(response && response.action == "close"){
            window.close();
            }
        })
        }});
}
function CopyCompleteDataEA(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(CopyALSubject()){
        chrome.tabs.sendMessage(tabs[0].id, {id:2, remarks:CopyALSubject(), type:"dataloader",assignedTo:userProfileName},function(response){
            if(response && response.action == "close"){
            window.close();
            }
        });
      }}
      );

}

}
{//Deployment Functions
function DepInitialize(){
    depReqNo = document.getElementById("depReqNo").value;
    depType = document.getElementById("depType").value;
    sourceOrg = document.getElementById("sourceOrg").value;
    destinationOrg = document.getElementById("destinationOrg").value;
    depUser = document.getElementById("depUser").value;
    depLabel = document.getElementById("depLabel").value;

    CalculateClock();

}
function DepStoreRetrieve(){
//Retrieve value from storage
chrome.storage.sync.get(['depReqNoS', 'depTypeS', 'sourceOrgS', 'destinationOrgS', 'depUserS','depLabelS'], function(DepUserInput){
    if(DepUserInput.depReqNoS){document.getElementById("depReqNo").value = DepUserInput.depReqNoS;
    }
    if(DepUserInput.depTypeS){document.getElementById("depType").value = DepUserInput.depTypeS;
    }
    if(DepUserInput.sourceOrgS){document.getElementById("sourceOrg").value = DepUserInput.sourceOrgS;
    }
    if(DepUserInput.destinationOrgS){document.getElementById("destinationOrg").value = DepUserInput.destinationOrgS;
    }
    if(DepUserInput.depUserS){document.getElementById("depUser").value = DepUserInput.depUserS;
    }
    if(DepUserInput.depLabelS){document.getElementById("depLabel").value = DepUserInput.depLabelS;
    }
    
});
}
function DepSaveData(){
    chrome.storage.sync.set({
        'depReqNoS':document.getElementById('depReqNo').value,
        'depTypeS':document.getElementById('depType').value,
        'sourceOrgS':document.getElementById('sourceOrg').value,
        'destinationOrgS':document.getElementById('destinationOrg').value,
        'depUserS':document.getElementById('depUser').value,
        'depLabelS':document.getElementById('depLabel').value

        });

}
function DepClearData(){
    chrome.storage.sync.set({
        'depReqNoS':"",
        'depTypeS':"",
        'sourceOrgS':"",
        'destinationOrgS':"",
        'depUserS':"",
        'depLabelS':""
        });
    document.getElementById('depReqNo').value = "";
    document.getElementById('depType').value = "";
    document.getElementById('sourceOrg').value = "";
    document.getElementById('destinationOrg').value = "";
    document.getElementById('depUser').value = "";
    document.getElementById('depLabel').value = "";
}

function CopyDepLabel(){
    DepInitialize();
    if(!IfAllPresent([depReqNo, sourceOrg, destinationOrg])){
        alert('Some required fields missing!');
        return;
    }
    depOutputTextarea.value = "RI-0" + depReqNo + " " + sourceOrg + " To " + destinationOrg + " " + clock;
    depOutputTextarea.select();
    document.execCommand("copy");
    window.close();
}
function CopyDepChatterComment(){
    DepInitialize();
    if(!IfAllPresent([depUser, sourceOrg, destinationOrg])){
        alert('Some required fields missing!');
        return;
    }
    var depOutputTextarea  = document.getElementById("depOutputTextarea");
    depOutputTextarea.value = "Hi @" + depUser + "\n\n";
    if(depType == "orgToOrg"){
        depOutputTextarea.value += "We have deployed the given components from "+ sourceOrg + " to " + destinationOrg + "." + "\n";
    }
    else{
        depOutputTextarea.value += "We have deployed the given release label to "+ destinationOrg + ".\n";
    }
    
    depOutputTextarea.value += "Please verify and confirm." + "\n";
    depOutputTextarea.value += "cc @Soumya Gampa@Poornima US";
    depOutputTextarea.select();
    document.execCommand("copy");
    window.close();
}
function CopyDepALSubject(){
    DepInitialize();
    if(!IfAllPresent([sourceOrg, destinationOrg])){
        alert('Some required fields missing!');
        return;
    }
    var depOutputTextarea  = document.getElementById("depOutputTextarea");
    if(depType == "orgToOrg"){
    depOutputTextarea.value = "1. Validate the given components on " + destinationOrg + ".\n";
    depOutputTextarea.value += "2. Deploy the given components from " + sourceOrg + " to " + destinationOrg + ".\n";
    }
    else{
        depOutputTextarea.value = "1. Validate the given release label on " + destinationOrg + ".\n";
        depOutputTextarea.value += "2. Deploy the given release label from " + sourceOrg + " to " + destinationOrg + ".\n";
    }
    if(depLabel != ""){
        depOutputTextarea.value += "Deployment Label:-\n";
        depOutputTextarea.value += depLabel;
    }
    
    depOutputTextarea.select();
    document.execCommand("copy");
    return depOutputTextarea.value;
}
function CopyDepALResolution(){
    DepInitialize();
    if(!IfAllPresent([sourceOrg, destinationOrg])){
        alert('Some required fields missing!');
        return;
    }
    var depOutputTextarea  = document.getElementById("depOutputTextarea");
    if(depType == "orgToOrg"){
    depOutputTextarea.value = "1. Validated the given components on " + destinationOrg + ".\n";
    depOutputTextarea.value += "2. Deployed the given components from " + sourceOrg + " to " + destinationOrg + ".\n";
    }
    else{
        depOutputTextarea.value = "1. Validated the given release label on " + destinationOrg + ".\n";
        depOutputTextarea.value += "2. Deployed the given release label from " + sourceOrg + " to " + destinationOrg + ".\n";
    }
    if(depLabel != ""){
        depOutputTextarea.value += "Deployment Label:-\n";
        depOutputTextarea.value += depLabel;
    }
    
    depOutputTextarea.select();
    document.execCommand("copy");
    return depOutputTextarea.value;
    
}
function CopyCompleteDeploymentAL(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(CopyDepALSubject() && CopyDepALResolution()){
    chrome.tabs.sendMessage(tabs[0].id, {id: 1, subject:CopyDepALSubject(), resolution: CopyDepALResolution(),assignedTo:userProfileName},function(response){
        if(response && response.action == "close"){
        window.close();
        }
    });
    }});
}
function CopyCompleteDeploymentEA(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(CopyDepALSubject()){
    chrome.tabs.sendMessage(tabs[0].id, {id:2, remarks:CopyDepALSubject(), type:"deployment",assignedTo:userProfileName},function(response){
        if(response && response.action == "close"){
        window.close();
        }
    });
    }});

}
}
{//EZ Commit Functions
function EZInitialize()
{
    ezReqNo = document.getElementById("ezReqNo").value;
    ezDestinationOrg = document.getElementById("ezDestinationOrg").value;
    ezRevisionLabel = document.getElementById("ezRevisionLabel").value;

    CalculateClock();
}
function EZStoreRetrieve(){
    chrome.storage.sync.get(['ezReqNoS', 'ezDestinationOrgS', 'ezRevisionLabelS'], function(EZUserInput){
        if(EZUserInput.ezReqNoS){document.getElementById("ezReqNo").value = EZUserInput.ezReqNoS;
        }
        if(EZUserInput.ezDestinationOrgS){document.getElementById("ezDestinationOrg").value = EZUserInput.ezDestinationOrgS;
        }
        if(EZUserInput.ezRevisionLabelS){document.getElementById("ezRevisionLabel").value = EZUserInput.ezRevisionLabelS;
        }  
    });
}
function EZSaveData(){
    chrome.storage.sync.set({
        'ezReqNoS':document.getElementById('ezReqNo').value,
        'ezDestinationOrgS':document.getElementById('ezDestinationOrg').value,
        'ezRevisionLabelS':document.getElementById('ezRevisionLabel').value,
        });
}
function EZClearData(){
    chrome.storage.sync.set({
        'ezReqNoS':"",
        'ezDestinationOrgS':"",
        'ezRevisionLabelS':""
        });
    document.getElementById('ezReqNo').value = "";
    document.getElementById('ezDestinationOrg').value = "";
    document.getElementById('ezRevisionLabel').value = "";

}
function CopyEZLabel(){
    EZInitialize();
    if(!IfAllPresent([ezReqNo, ezDestinationOrg])){
        alert('Some required fields missing!');
        return;
    }
    CalculateClock();
    var ezLabelValue = "RI-0" + ezReqNo + " " + ezDestinationOrg + " Commit " + clock;
    var ezOutputTextarea  = document.getElementById("ezOutputTextarea");
    ezOutputTextarea.value = ezLabelValue;
    ezOutputTextarea.select();
    document.execCommand("copy");
    window.close();
}
function CopyEZALSubject(){
    EZInitialize();
    if(!IfAllPresent([ezDestinationOrg, ezRevisionLabel])){
        alert('Some required fields missing!');
        return;
    }
    var ezOutputTextarea  = document.getElementById("ezOutputTextarea");
    ezOutputTextarea.value = "1. Perform EZ Commit on " + ezDestinationOrg + ".\n";
    ezOutputTextarea.value += "Revision Label :-"+ ezRevisionLabel;
    ezOutputTextarea.select();
    document.execCommand("copy");
    return ezOutputTextarea.value;
}
function CopyEZALResolution(){
    EZInitialize();
    if(!IfAllPresent([ezDestinationOrg, ezRevisionLabel])){
        alert('Some required fields missing!');
        return;
    }
    var ezOutputTextarea  = document.getElementById("ezOutputTextarea");
    ezOutputTextarea.value = "1. Performed EZ Commit on " + ezDestinationOrg + ".\n";
    ezOutputTextarea.value += "Revision Label :-"+ ezRevisionLabel;
    ezOutputTextarea.select();
    document.execCommand("copy");
    return ezOutputTextarea.value;
}
function CopyCompleteCommitAL(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(CopyEZALSubject() && CopyEZALResolution()){
    chrome.tabs.sendMessage(tabs[0].id, {id: 1, subject:CopyEZALSubject(), resolution: CopyEZALResolution(),assignedTo:userProfileName},function(response){
        if(response && response.action == "close"){
        window.close();
        }
    });
    }});
}
function CopyCompleteCommitEA(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(CopyEZALSubject()){
    chrome.tabs.sendMessage(tabs[0].id, {id:2, remarks:CopyEZALSubject(), type:"ezcommit",assignedTo:userProfileName},function(response){
        if(response && response.action == "close"){
        window.close();
        }
    });
    }});

}
}
{//Settings Functions
function SaveSettings(){
chrome.storage.sync.set({
    'settingsUserNameS':document.getElementById('settingsUserName').value
    });
    userProfileName = document.getElementById('settingsUserName').value;   
}
function SettingsStoreRetrieve(){
chrome.storage.sync.get(['settingsUserNameS'], function(SettingsUserInput){
    if(SettingsUserInput.settingsUserNameS){document.getElementById("settingsUserName").value = SettingsUserInput.settingsUserNameS;
    }
    userProfileName = SettingsUserInput.settingsUserNameS;     
});
}
}
{//Clock Function
function CalculateClock(){
    date = new Date();
    var month = Filter(date.getMonth() + 1);
    var day = Filter(date.getDate());
    var hour = Filter(date.getHours());
    var minute = Filter(date.getMinutes());
    var monthDate= month + day;
    var minuteHour = hour + minute;
    var timeZone = GetTimezone();
    //Calculating time part
    clock = monthDate + " " + minuteHour + " " + timeZone;
}
}
function openActiveTab(){
    chrome.storage.sync.get(['currentTab'], function(initialTab){
        if(initialTab.currentTab){
        if(initialTab.currentTab ==1){
            openAction(event, "dataloader");
        }
        else if(initialTab.currentTab == 2){
            openAction(event, "deployment");
        }
        else if(initialTab.currentTab == 3){
            openAction(event, "ezcommit");
        }
    }
    else{
        openAction(event, "dataloader");
    }
    });
}
function openAction(evt, action) {
    if(action == 'dataloader')
    {
        activeTab = 1;
    }
    else if(action == 'deployment'){
        activeTab = 2;
    }
    else if(action == 'ezcommit'){
        activeTab = 3;
    }
    chrome.storage.sync.set({'currentTab': activeTab});

    var dummyDiv = document.getElementById("dummyDiv");
    dummyDiv.style.display = "none";
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(action).style.display = "block";
    if(event){
    evt.currentTarget.className += " active";
    }
    else{
        document.getElementById(action+'Button').className+= " active";
    }
  }
function IfAllPresent(requiredFields){
    for(var i = 0; i< requiredFields.length; i++){
        if(requiredFields[i] == "" || requiredFields[i] == "RI-0"){
        return false;
        }
    }
return true;
}
function FindMetadata(){
    var inputMetadata = document.getElementById("metadataAlias").value;
    inputMetadata = inputMetadata.toLowerCase();
    if(inputMetadata == ""){
        document.getElementById('metadataActualName').innerHTML = 'Enter a Metadata alias';
        return;
    }
    for(var key in metadata){
        if(key == inputMetadata){
            document.getElementById('metadataActualName').innerHTML = metadata[key];
            return;
        }
    }
    document.getElementById('metadataActualName').innerHTML = "No values found";
}