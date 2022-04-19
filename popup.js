const submitBtn = document.getElementById("submitBtn");
const useAppCb = document.getElementById("useAppCb");
const firstMessageTb = document.getElementById("firstMessageTb");


window.onload = async () => {
    var data = await chrome.storage.sync.get(["useApp", "firstMessage"]);
    console.log(data);
    useAppCb.checked = data.useApp;
    firstMessageTb.value = data.firstMessage;
};

submitBtn.onclick = async () => {
    chrome.storage.sync.set({
        useApp: useAppCb.checked,
        firstMessage: firstMessageTb.value
    });
    window.close()
};
