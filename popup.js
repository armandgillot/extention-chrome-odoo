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

// ICI fonction désactivation ou activation ---------------------
function onClickedEnable() {
  chrome.storage.local.set({ enabled: true }, function () {
    chrome.tabs.reload({ bypassCache: true });
    console.log("Enabled");
    location.reload();
  });
}

function onClickedDisable() {
  chrome.storage.local.set({ enabled: false }, function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;

      if (currentUrl.includes("debug=assets")) {
        const newUrl = currentUrl.replace(/[\?|&]debug=assets/g, "/?debug=0");
        chrome.tabs.update({ url: newUrl });
      }

      chrome.tabs.executeScript({
        code: "window.location.reload();",
      });
    });

    chrome.tabs.reload({ bypassCache: true });
    console.log("Disabled");
    location.reload();
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
