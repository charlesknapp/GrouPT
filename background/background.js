// Import the 'gpt-3' package (install it via npm)
const { OpenAIApi, CreateCompletionRequest } = require('gpt-3');

// Tab and group mapping
const tabGroupMap = {};

// Function to initialize the OpenAI API client with the user's API key
function initializeOpenAI(apiKey) {
  return new OpenAIApi({ key: apiKey });
}

// Function to enable the extension
function enableExtension() {
  chrome.storage.local.set({ enabled: true }, function () {
    // Extension is enabled, implement your logic here
  });
}

// Function to disable the extension
function disableExtension() {
  chrome.storage.local.set({ enabled: false }, function () {
    // Extension is disabled, implement your logic here
  });
}

// Function to update radio button states based on extension's enabled/disabled state
function updateRadioButtons() {
  chrome.storage.local.get('enabled', function (data) {
    const isEnabled = data.enabled;
    const enableExtensionRadio = document.getElementById('enableExtension');
    const disableExtensionRadio = document.getElementById('disableExtension');

    enableExtensionRadio.checked = isEnabled;
    disableExtensionRadio.checked = !isEnabled;
  });
}

chrome.action.onClicked.addListener(function (tab) {
  chrome.storage.local.get('enabled', function (data) {
    const isEnabled = data.enabled;

    if (isEnabled) {
      disableExtension();
    } else {
      enableExtension();
    }

    chrome.tabs.reload(tab.id);
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'tabTitleChange') {
    const tabId = message.tabId;
    const tabTitle = message.tabTitle;

    chrome.storage.local.get('apiKey', function (data) {
      const apiKey = data.apiKey;

      if (apiKey) {
        analyzeTabTitleWithGPT(apiKey, tabTitle)
          .then((group) => {
            updateTabGroup(tabId, group);
          })
          .catch((error) => {
            console.error('Error analyzing tab title with GPT:', error);
          });
      } else {
        console.error('API Key not found in local storage.');
      }
    });
  }
});

// ... (The remaining functions are unchanged)

// Initialize radio buttons on popup load
updateRadioButtons();
