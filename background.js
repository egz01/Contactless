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
        const data = {};
        const awaitableGet = getKeysFromStorageSync(["useApp", "firstMessage"]).then(received => {
          Object.assign(data, received);
        });
        await awaitableGet;
        let useApp = data.useApp;
        let firstMessage = data.firstMessage;

        if (!useApp) {
          url = `https://web.whatsapp.com/send?phone=${number}&text=${firstMessage}&app_absent=0`;
          await switchOrCreateWhatsAppTab(url, tab);
        }
        else {
          url = `https://wa.me/${number}?text=${firstMessage}&app_absent=0`
          const newTab = {}
          const awaitableTab = createNewTabSync(url).then(received => {
            Object.assign(newTab, received);
          });
          await awaitableTab;
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
  }
});

function parseNumber(text) {
  number = text.match(/\+?\d+-?\d+-?\d+-?\d+/); // this should identify most numbers, at least in the country this code was written in...
  return number;
}

async function switchOrCreateWhatsAppTab(url, activeTabIndex) {
    chrome.tabs.query({url: ["*://web.whatsapp.com//*"]}).then(tabs => {
      var index = 0;
      if (!tabs.length) {
        // in the future will create new tab, for now just forfeit
        return;
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

function createNewTabSync (newUrl) {
  return new Promise((resolve, reject) =>
  {
    chrome.tabs.create({
      active: true,
      url: newUrl
    }, tab => {
      if (!tab && chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve(tab);
    });
  })
}

function getKeysFromStorageSync (keys) {
  return new Promise((resolve, reject) =>
  {
    chrome.storage.sync.get(keys, (data) =>
    {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(data);
    });
  });
}
