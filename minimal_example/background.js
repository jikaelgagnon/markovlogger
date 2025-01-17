let tabs = new Map();
let matches = chrome.runtime.getManifest().content_scripts[0].matches;
console.log(matches[0]);

function addEntry (tab) {
  if (!tabs.has(tab.id)){
    tabs.set(tab.id, new Map());
    let m = tabs.get(tab.id);
    m.set("url", [])
    m.set("time", [])
  }
  tabs.get(tab.id).get("url").push(tab.url);
  tabs.get(tab.id).get("time").push(Date.now());
};


chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(activeInfo);
  if (tabs.has(activeInfo.tabId)){return;}

  chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url) { // Check if the tab has a URL
          console.log("Tab activated with URL:", tab.url);
          addEntry(tab);
      }
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  console.log("tab created with url", tab.url);
  addEntry(tab);
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) { // Check if the URL was updated
      console.log(changeInfo);
      console.log("Tab URL updated:", changeInfo.url);
      addEntry(tab);
      console.log(tabs);
      // console.log(tab);
  }
});

// TODO: Add database/sheets
// TODO: Add unique user ID


