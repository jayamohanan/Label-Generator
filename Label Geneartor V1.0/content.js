chrome.runtime.onMessage.addListener(
  function(outputs, sender, sendResponse) {
    if(outputs.id == 1){
    var isActionLog = FillActionLog(outputs);
    sendResponse({action:"close"});
    }
    else if(outputs.id == 2){
    var isEffortAnalysis = FillEffortAnalysis(outputs);
    sendResponse({action:"close"});
    }
  });
function FillActionLog(outputs){
  document.getElementById('00NE0000005YBC2').value = outputs.subject;
  document.getElementById('00NE0000005YBC0').value = outputs.resolution;
  document.getElementById('00NE0000005YEul').value = 1;
  document.getElementById('00NE0000005YBBv').value = 1;
  document.getElementById('CF00NE0000005YBBq').value = outputs.assignedTo;
  var date = new Date();
  document.getElementById("00NE0000005YBBt").value = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
}
function FillEffortAnalysis(outputs){
  document.getElementById('CF00NE0000005YBCT').value = outputs.assignedTo;
  if(outputs.type == "dataloader"){
  document.getElementById('00NE0000005YBCV').value = 1;
  document.getElementById('00NE0000006SyGa').value = outputs.remarks;
  }
  else if(outputs.type == "deployment" || outputs.type == "ezcommit"){
  document.getElementById('00NE0000006SyGe').value = 1;
  document.getElementById('00NE0000006SyGb').value = outputs.remarks;
  }
}