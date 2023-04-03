function updateDebugMode(valueDebug) {
  const tabUrl = new URL(location.href);
  const params = new URLSearchParams(tabUrl.search);
  const debugValue = valueDebug;
  params.set("debug", debugValue);
  const url =
    tabUrl.origin + tabUrl.pathname + `?${params.toString()}` + tabUrl.hash;
  console.log("new url : " + url);
  location = url;
}

chrome.storage.local.get("enabled", function (result) {
  if (result.enabled !== false) {
    updateDebugMode("assets");
  } else {
    updateDebugMode("0");
  }
});
