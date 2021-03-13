// function to add url
function addUrl(event) {
  // console.log('omg hello');
  // console.log(e);
  event.preventDefault()

  const url = document.getElementById('url').value;

  console.log(url);

  // if url is not empty string, then add to chrome.storage

  // var color = document.getElementById('color').value;
  // var likesColor = document.getElementById('like').checked;
  // // grab value of text field


  // chrome.storage.sync.set({
  //   favoriteColor: color,
  //   likesColor: likesColor
  // }, function() {
  //   // Update status to let user know options were saved.
  //   var status = document.getElementById('status');
  //   status.textContent = 'Options saved.';
  //   setTimeout(function() {
  //     status.textContent = '';
  //   }, 750);
  // });
}

console.log('whatup council');
chrome.storage.sync.get("urlPrefixes", ({ urlPrefixes }) => {
  console.log('urlPrefixes we got in options page: ', urlPrefixes);
})
document.getElementById('add-btn').addEventListener('click', addUrl);

// show list of urlPrefixes 