chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "messageContextMenu",
      "title": "Message on Whatsapp",
      "contexts": ["selection"]
    });
  });