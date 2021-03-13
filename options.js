let urlPrefixesGlobal;
document.getElementById('add-btn').addEventListener('click', addUrlPrefix);
displayUrlPrefixes();

/**
 * Adds new urlPrefix to chrome storage and refreshes the displayed list.
 * 
 * @param {*} event 
 */
function addUrlPrefix(event) {
  event.preventDefault()

  const url = document.getElementById('url').value;
  if (url) {
    // TODO: if it already exists in urlPrefixes, show error
    urlPrefixesGlobal[url] = true;
    chrome.storage.sync.set({ urlPrefixes: urlPrefixesGlobal});
  }

  displayUrlPrefixes();
}

/**
 * Displays current urlPrefixes in chrome storage.
 */
function displayUrlPrefixes() {
  chrome.storage.sync.get("urlPrefixes", ({ urlPrefixes }) => {
    // set urlPrefixes globally so it can be accessed elsewhere
    urlPrefixesGlobal = urlPrefixes;

    const urlPrefixesList = document.querySelector('#url-prefixes');
    Object.keys(urlPrefixesGlobal).forEach((urlPrefix) => {
      // if already rendered, don't add again
      if (document.getElementById(urlPrefix)) return;

      const li = document.createElement('li');
      li.append(urlPrefix);
      li.setAttribute('class', 'url-prefix');
      li.setAttribute('id', urlPrefix);
      urlPrefixesList.appendChild(li);
    })
  });
}

