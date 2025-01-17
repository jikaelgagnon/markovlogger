let buttons = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.state)
        buttons.push(request.state);
        console.log(buttons);
        sendResponse({received: "goodbye"});
    }
  );
