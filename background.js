chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "messageContextMenu",
      "title": "Message on Whatsapp",
      "contexts": ["selection"]
    });
  });

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (tab) {
    if (info.menuItemId === "messageContextMenu") {
      console.log({"info": info, "tab": tab});
      number = parseNumber(info.selectionText);
      console.log("parsed number is: " + number);
    }
  }
});

function parseNumber(text) {
  number = text.match(/\+?\d+/);
  return number;
}
