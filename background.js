// const urlPrefixes = ['www.facebook.com', 'zoom.us/j/', 'zoom.us/s/', 'zoom.us/postattendee', 'zoom.us/wc/leave', 'prod.liveshare.vsengsaas.visualstudio.com/join'];
const urlPrefixes = {
  "www.facebook.com": true,
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

// Set up the listener for the upcoming message, sender from the content.js
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.shouldCloseTab) {
    console.log("message received");
    // if message is true then close current tab by referencing to sender id
    // will close window if only one tab open
    chrome.tabs.remove(sender.tab.id);
  }
});

// set up listener for browser action click
// open options page (embedded or new tab) that allows user to add a new urlPrefix (pre-populated with current tab's url)
// when user clicks save, it pushes url to a urlPrefix array stored in chrome.storage
// so now content.js should check for matches in that array
