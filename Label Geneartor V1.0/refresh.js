//setInterval(Refresh, 30000);

var ctrl = new KeyboardEvent("keydown", {ctrlKey : true,keyCode: 70});
window.dispatchEvent(ctrl);
window.addEventListener("keydown", function(ctrl){
  alert(ctrl.keyCode); //expecting 50
});

function Refresh(){
  //  chrome.runtime.sendMessage({action: "refresh"});
  location.reload(true);
}
