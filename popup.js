function onClickedSelector() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;

    const webIndex = currentUrl.indexOf("/web");
    if (webIndex > -1) {
      const newUrl = currentUrl
        .substring(0, webIndex + 4)
        .concat("/database/selector");
      console.log(newUrl);
      chrome.tabs.update({ url: newUrl });
    }
  });
}
function onClickedManager() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;

    const webIndex = currentUrl.indexOf("/web");
    if (webIndex > -1) {
      const newUrl = currentUrl
        .substring(0, webIndex + 4)
        .concat("/database/manager");
      console.log(newUrl);
      chrome.tabs.update({ url: newUrl });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("databaseSelector")
    .addEventListener("click", onClickedSelector);
});
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("databaseManager")
    .addEventListener("click", onClickedManager);
});

// Activer/Desactiver mode debug
function onClickedEnable() {
  chrome.storage.local.set({ enabled: true });
  chrome.tabs.reload({ bypassCache: true });
  location.reload();
  console.log("Enabled");
}

function onClickedDisable() {
  chrome.storage.local.set({ enabled: false }, function () {
    chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.reload({ bypassCache: true });
    location.reload();
    console.log("Disabled");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("enable").addEventListener("click", onClickedEnable);
  document
    .getElementById("disable")
    .addEventListener("click", onClickedDisable);

  chrome.storage.local.get("enabled", function (result) {
    if (result.enabled !== false) {
      document.getElementById("enable").disabled = true;
    } else {
      document.getElementById("disable").disabled = true;
    }
  });
});
