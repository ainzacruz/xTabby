const urlPrefixes = {
  "facebook.com": true,
  "zoom.us/j/": true,
  "zoom.us/s/": true,
  "zoom.us/postattendee": true,
  "zoom.us/wc/leave": true,
  "us04web.zoom.us/j/": true,
  "prod.liveshare.vsengsaas.visualstudio.com/join": true,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ urlPrefixes });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.shouldCloseTab) {
    chrome.tabs.remove(sender.tab.id);
  }
});
