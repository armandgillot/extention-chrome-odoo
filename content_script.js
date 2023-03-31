chrome.storage.local.get("enabled", function (result) {
  if (result.enabled !== false) {
    if (!location.search.includes("debug=assets")) {
      location.search += (location.search ? "&" : "?") + "debug=assets";
    }
  }
});
