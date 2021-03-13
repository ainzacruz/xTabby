chrome.storage.sync.get("urlPrefixes", ({ urlPrefixes }) => {
  console.log("urlPrefixes we got: ", urlPrefixes);

  // get the URL of current tab
  const url = new URL(window.location.href);

  // check if our href matches any of the prefixes
  //? perhaps a more optimized way to check if url is in urlPrefixes? O(1) instead of O(n)?
  //TODO: catch urls with and without 'www.' (e.g. if google.com is listed, it should catch www.google.com as well). maybe use regexp
  const matchesUrlPrefix = () =>
    Object.keys(urlPrefixes).some((urlPrefix) =>
      url.href.startsWith(`${url.protocol}//${urlPrefix}`)
    );

  const checkMatchesAndSendMessage = () => {
    console.log("checkMatchesAndSendMessage");
    if (matchesUrlPrefix()) {
      // if yes, then send message to background.js
      chrome.runtime.sendMessage({ shouldCloseTab: true });
    }
  };

  // run after a few seconds, enough time for user to click confirmation box
  setTimeout(checkMatchesAndSendMessage, 3000);
});
