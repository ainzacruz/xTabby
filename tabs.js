document.getElementById("DA").addEventListener("click", deleteAdditional);
document.getElementById("DS").addEventListener("click", deleteSlected);
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
function deleteSlected() {
  // add fnctionality for deleting selected
}

// delete duplicate tabs
function deleteDuplicates() {
  chrome.tabs.query({}, (tabs) => {
    console.log(tabs);
    const obj = {};
    tabs.forEach((tab) => {
      if (!obj[tab.url]) {
        obj[tab.url] = [tab.id];
      } else {
        obj[tab.url].push(tab.id);
      }
    });
    for (let key in obj) {
      if (obj[key].length > 1) {
        for (let i = 1; i < obj[key].length; i++) {
          chrome.tabs.remove(obj[key][i]);
        }
      }
    }
  });
}

// clicking each list actives tab
function activateTab() {}
