document.getElementById('DA').addEventListener("click", deleteAdditional)
document.getElementById('DS').addEventListener("click", deleteSlected)
document.getElementById('DD').addEventListener("click", deleteDuplicates)


getElementByTagName('Ulist')

function deleteAdditional () {
    chrome.tabs.query({}, function(tabs){  
        console.log(tabs);  
        tabs.forEach(function(tab){
            if (!tab['active']) {
                chrome.tabs.remove(tab.id)
            }
        });
     });
}

function deleteSlected () {
    //const emp = [];
    //use addEventListner to listen out for selected tabs
    urls.addEventLister('change', (tabs)=>{
     if(this.checked){
         chrome.tabs.remove(tab.id)
         //OR
         //emp.push(tab.id)

     } 


    })
    //add selected tabs to an array
    //use tabs.remove on array els
       //tabs.onRemoved
    console.log("DS")
}
function deleteDuplicates () {
    chrome.tabs.query({}, function(tabs){  
        console.log(tabs);
        const obj = {};
        tabs.forEach(function(tab){
           if (!obj[tab.url]) {
               obj[tab.url] = [tab.id];
           } else {
               obj[tab.url].push(tab.id);
           }
        });
        for (let key in obj) {
            if (obj[key].length > 1) {
                for (let i=1; i<obj[key].length; i++) {
                    chrome.tabs.remove(obj[key][i]);
                }
            }
        }
     });
}