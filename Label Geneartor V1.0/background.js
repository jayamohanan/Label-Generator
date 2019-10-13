/*chrome.runtime.onMessage.addListener(
    function(message) {
      
      if (message.action == "refresh")
      chrome.tabs.query({active:false,currentWindow: true}, 
        function (tabs) {chrome.tabs.update(tabs[0].id, {url: tabs[0].url});});
    });*/