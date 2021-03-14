const urlList = document.getElementById("Ulist");

chrome.tabs.query({}, (tabs) => {
  tabs.forEach((tab) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("class", "tab-checkbox");
    input.setAttribute("value", tab.id);

    const img = document.createElement("img");
    img.setAttribute("src", `${tab.favIconUrl}`);

    const p = document.createElement("p");
    p.innerHTML = `${tab.title}`;

    const tabInfo = document.createElement("div");
    tabInfo.setAttribute("class", "tab-info");
    tabInfo.append(img, p);
    tabInfo.addEventListener("click", () => activateTab(tab.id, tab.windowId));

    li.append(input, tabInfo);
    li.setAttribute("class", "tab-li");
    li.setAttribute("id", tab.id);

    urlList.appendChild(li);
  });
});

function activateTab(tabId, windowId) {
  chrome.tabs.update(tabId, { active: true });
  chrome.windows.update(windowId, { focused: true });
}
