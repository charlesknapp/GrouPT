document.addEventListener("DOMContentLoaded", function () {
    const apiKeyInput = document.getElementById("apiKey");
    const saveApiKeyButton = document.getElementById("saveApiKeyButton");
    const toggleExtension = document.getElementById("toggleExtension");
    const settingsSlide = document.getElementById("settings");
  
    // Load extension settings from storage
    chrome.storage.local.get(['apiKey', 'enabled'], function (data) {
      const apiKey = data.apiKey;
      const isEnabled = data.enabled;
  
      if (apiKey) {
        apiKeyInput.value = apiKey;
        settingsSlide.style.display = "block"; // Show the settings slide
        toggleExtension.checked = isEnabled;
      }
    });
  
    saveApiKeyButton.addEventListener("click", function () {
      const apiKey = apiKeyInput.value.trim();
      if (apiKey) {
        // Save the API key in extension storage
        chrome.storage.local.set({ apiKey: apiKey }, function () {
          settingsSlide.style.display = "block"; // Show the settings slide
        });
      }
    });
  
    toggleExtension.addEventListener("change", function () {
      const isEnabled = toggleExtension.checked;
      chrome.storage.local.set({ enabled: isEnabled });
    });
  });  