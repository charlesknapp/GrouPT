document.addEventListener("DOMContentLoaded", function () {
    const apiKeyInput = document.getElementById("apiKey");
    const saveApiKeyButton = document.getElementById("saveApiKeyButton");
    const toggleExtension = document.getElementById("toggleExtension");
    const apiKeyEntrySlide = document.getElementById("apiKeyEntry");
    const settingsSlide = document.getElementById("settings");
    const welcomeSlide = document.getElementById("welcomeSlide");
  
    function showSlide(slide) {
      apiKeyEntrySlide.style.display = "none";
      settingsSlide.style.display = "none";
      welcomeSlide.style.display = "none";
  
      slide.style.display = "block";
    }
  
    chrome.storage.local.get(['apiKey', 'enabled'], function (data) {
      const apiKey = data.apiKey;
      const isEnabled = data.enabled;
  
      if (apiKey) {
        showSlide(settingsSlide);
        apiKeyInput.value = apiKey;
        toggleExtension.checked = isEnabled;
      } else {
        showSlide(apiKeyEntrySlide);
      }
    });
  
    saveApiKeyButton.addEventListener("click", function () {
      const apiKey = apiKeyInput.value.trim();
      if (apiKey) {
        chrome.storage.local.set({ apiKey: apiKey }, function () {
          showSlide(settingsSlide);
        });
      }
    });
  
    toggleExtension.addEventListener("change", function () {
      const isEnabled = toggleExtension.checked;
      chrome.storage.local.set({ enabled: isEnabled });
    });
  
    showSlide(welcomeSlide);
  });
  