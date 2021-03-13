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

  document.getElementById('url').value = '';

  displayUrlPrefixes();
}

/**
 * Goes through chrome storage and adds any un-rendered urlPrefixes to the list.
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
      const removeButton = document.createElement('button');
      removeButton.innerHTML = 'x';
      removeButton.addEventListener('click', () => {deleteUrlPrefix(urlPrefix)});

      li.append(removeButton, urlPrefix);
      li.setAttribute('class', 'url-prefix');
      li.setAttribute('id', urlPrefix);
      urlPrefixesList.appendChild(li);
    })
  });
}

/**
 * Deletes list item and urlPrefix from chrome storage.
 * 
 * @param {*} urlPrefix The urlPrefix to delete.
 */
function deleteUrlPrefix(urlPrefix){
  document.getElementById(urlPrefix).remove();
  delete urlPrefixesGlobal[urlPrefix];
  chrome.storage.sync.set({ urlPrefixes: urlPrefixesGlobal});
}