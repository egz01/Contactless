chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "messageContextMenu",
    "title": "Message on Whatsapp",
    "contexts": ["selection"]
  });
  chrome.storage.sync.set({
    useApp: false,
    firstMessage: ""
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab) {
    if (info.menuItemId === "messageContextMenu") {
      number = parseNumber(info.selectionText);
      if (number) {

        var data = await chrome.storage.sync.get(["useApp", "firstMessage"]);
        var useApp = data.useApp;
        var firstMessage = data.firstMessage;

        if (!useApp) {
          url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(firstMessage)}&app_absent=0`;
          await switchOrCreateWhatsAppTab(url, tab.index);
        }
        else {
          url = `https://wa.me/${number}?text=${encodeURIComponent(firstMessage)}&app_absent=0`
          await chrome.tabs.create({
            active: true,
            url: url,
            index: tab.index + 1
          }, 
          function (newTab) {
            // somehow get rid of the new tab...
          });
        }
      }
    }
    else {
      chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => {
        alert("Couldn't find a valid whatsapp-number in selected text.");
      }
      });
    }
  }
});

function parseNumber(text) {
  number = text.match(/\+?\d+[-\s]?\d+[-\s]?\d+[-\s]?\d+/); // this should identify most numbers, at least in the country this code was written in...
  number = String(number).replace(/[\+-\s]/g, '');
  return number;
}

async function switchOrCreateWhatsAppTab(url, activeTabIndex) {
    chrome.tabs.query({url: ["*://web.whatsapp.com//*"]}).then(async (tabs) => {
      var index = 0;
      if (!tabs.length) {
        var waTab = await chrome.tabs.create({
          active: true,
          url: url,
          index: activeTabIndex + 1
        });
        index = waTab.index;
      }
      else { // a whatsapp tab already exists
        index = tabs[0].index;
      }

      return chrome.tabs.highlight({'tabs': index});
    }).then(tab => {
      if (!tab) return;
      chrome.tabs.update(tab.tabId, {"url": url});
    });
}
