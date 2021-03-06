document.getElementById("DA").addEventListener("click", deleteAdditional);
document.getElementById("DS").addEventListener("click", deleteSelected);
document.getElementById("DD").addEventListener("click", deleteDuplicates);

// delete all other tabs, but active one
function deleteAdditional() {
  chrome.tabs.query({}, (tabs) => {
    console.log(tabs);
    tabs.forEach((tab) => {
      if (!tab.active) {
        chrome.tabs.remove(tab.id);
      }
    });
  });
}

// delete selected
function deleteSelected() {
  const selectedTabs = document.querySelectorAll(".tab-checkbox:checked");
  selectedTabs.forEach((tab) => {
    chrome.tabs.remove(Number(tab.value));
  });
}

// delete duplicate tabs
function deleteDuplicates() {
  chrome.tabs.query({}, (tabs) => {
    console.log(tabs);
    const urls = {};
    tabs.forEach((tab) => {
      if (!urls[tab.url]) {
        urls[tab.url] = [tab.id];
      } else {
        urls[tab.url].push(tab.id);
      }
    });
    Object.keys(urls).forEach((key) => {
      if (urls[key].length > 1) {
        for (let i = 1; i < urls[key].length; i += 1) {
          chrome.tabs.remove(urls[key][i]);
        }
      }
    });
  });
}
