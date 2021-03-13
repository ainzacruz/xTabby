chrome.storage.sync.get("urlPrefixes", ({ urlPrefixes }) => {
  const url = new URL(window.location.href);

  //? perhaps a more optimized way to check if url is in urlPrefixes? O(1) instead of O(n)?
  //TODO: catch urls with and without 'www.' (e.g. if google.com is listed, it should catch www.google.com as well). maybe use regexp
  const matchesUrlPrefix = () =>
    Object.keys(urlPrefixes).some((urlPrefix) =>
      url.href.startsWith(`${url.protocol}//${urlPrefix}`)
    );

  const checkMatchesAndSendMessage = () => {
    if (matchesUrlPrefix()) {
      chrome.runtime.sendMessage({ shouldCloseTab: true });
    }
  };

  // run after a few seconds, enough time for user to click "Open in Zoom app"
  setTimeout(checkMatchesAndSendMessage, 3000);

  //TODO: create shortcut in the browser action to add current tab's url to urlPrefixes 
});
