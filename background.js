chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startAutoApply") {
    chrome.tabs.create({ url: "https://www.instahyre.com/login/" }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === "complete") {
          chrome.tabs.sendMessage(tabId, {
            action: "autoApply",
            preferences: request.preferences,
          });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    });
    sendResponse({ status: "started" });
  }
  return true;
});
