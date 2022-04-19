chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "messageContextMenu",
      "title": "Message on Whatsapp",
      "contexts": ["selection"]
    });

    chrome.storage.sync.set({
      "useApp": false,
      "firstMessage": ""
    });
  });

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (tab) {
    if (info.menuItemId === "messageContextMenu") {
      console.log({"info": info, "tab": tab});

      number = parseNumber(info.selectionText);
      console.log("parsed number is: " + number);

      if (number) {
        tab = switchToWhatsappTabIfExists(number);
        console.log("succesfully returned to main control", {"tab": tab});
      }
    }
  }
});

function parseNumber(text) {
  number = text.match(/\+?\d+-?\d+-?\d+-?\d+/); // this should identify most numbers, at least in the country this code was written in...
  return number;
}

function switchToWhatsappTabIfExists(number) {
  chrome.tabs.query({url: ["*://web.whatsapp.com//*"]}).then((tabs) => {
    if (!tabs.length) return;

    return chrome.tabs.highlight({'tabs': tabs[0].index});
  }).then(tab => {
    if (!tab) return;

    console.log("succesfully switched to whatsapp tab", tab);
    return tab;
  }).then(tab => {
    if (!tab) return;
    url = `https://web.whatsapp.com/send?phone=${number}&text=test&app_absent=0`;
    chrome.tabs.update(tab.tabId, {"url": url});
  });
}
