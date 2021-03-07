document.addEventListener("DOMContentLoaded", () => {
  const urlList = document.getElementById("Ulist");
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      const li = document.createElement("li");
      const input = document.createElement(`input`);
      input.setAttribute("type", "checkbox");
      input.setAttribute("class", "tab-checkbox");
      input.setAttribute("value", tab.id);
      const img = document.createElement("img");
      img.setAttribute("src", `${tab.favIconUrl}`);
      const p = document.createElement("p");
      p.innerHTML = `${tab.title}`;
      li.append(input, img, p);
      // li.setAttribute("class", "tab-li");
      urlList.appendChild(li);
    });
  });
});
