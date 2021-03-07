document.addEventListener("DOMContentLoaded", function () {
  const urlList = document.getElementById("Ulist");
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      const li = document.createElement("li");
      const input = document.createElement(`input`);
      input.setAttribute("type", "checkbox");
      const img = document.createElement("img");
      img.setAttribute("src", `${tab.favIconUrl}`);
      const p = document.createElement("p");
      p.innerHTML = `${tab.title}`;
      li.append(input, img, p);
      urlList.appendChild(li);
    });
  });
});
