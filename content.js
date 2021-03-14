chrome.storage.sync.get("urlPrefixes", ({ urlPrefixes }) => {
  const currentUrl = new URL(window.location.href);

  const matchesUrlPrefix = (url) =>
    Object.keys(urlPrefixes).some(
      (urlPrefix) =>
        url.href.startsWith(`${url.protocol}//${urlPrefix}`) ||
        url.href.startsWith(`${url.protocol}//www.${urlPrefix}`)
    );

  // run after a few seconds, enough time for user to click "Open in Zoom app"
  setTimeout(() => {
    if (matchesUrlPrefix(currentUrl)) {
      chrome.runtime.sendMessage({ shouldCloseTab: true });
    }
  }, 3000);

  //TODO: create shortcut in the browser action to add current tab's url to urlPrefixes
});
