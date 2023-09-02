// Content script logic for monitoring tab title changes
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.title) {
      // Send the updated tab title to the background script for analysis
      chrome.runtime.sendMessage(
        { action: "tabTitleChange", tabId: tabId, tabTitle: changeInfo.title },
        function () {}
      );
    }
  });
  