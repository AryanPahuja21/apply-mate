chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startAutoApply") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "autoApply" }, (response) => {
        if (response && response.status === "started") {
          console.log("send to script");
        } else {
          console.log("Error starting auto-apply process.");
        }
      });
    });
    sendResponse({ status: "started" });
  }
  return true;
});