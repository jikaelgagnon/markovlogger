let tabs = new Map();

add_new_tab = (tabId, url) => tabs.set(tabId, [url])


chrome.tabs.onActivated.addListener(function (activeInfo) {
  if (tabs.has(activeInfo.tabId)){return;}

  chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url) { // Check if the tab has a URL
          console.log("Tab activated with URL:", tab.url);
          add_new_tab(tab.id, tab.url);
          console.log(tabs);

      }
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  console.log("tab created with url", tab.url);
  add_new_tab(tab.id, tab)
  console.log(tabs);
})

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab);
    if (changeInfo.url) { // Check if the URL was updated
        console.log("Tab URL updated:", changeInfo.url);
        tabs.get(tabId).push(changeInfo.url);
        console.log(tabs);
    }
});


