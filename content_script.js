function updateDebugMode(valueDebug) {
  const tabUrl = new URL(location.href);
  const params = new URLSearchParams(tabUrl.search);
  const debugValue = valueDebug;
  params.set("debug", debugValue);
  const url =
    tabUrl.origin + tabUrl.pathname + `?${params.toString()}` + tabUrl.hash;
  console.log("new url : " + url);

  // Vérifier si la nouvelle URL est différente de l'URL actuelle
  if (url !== location.href) {
    location.href = url;
  }
}

chrome.storage.local.get("enabled", function (result) {
  if (result.enabled !== false) {
    updateDebugMode("assets");
  } else {
    updateDebugMode("0");
  }
});
