let submitBtn = document.getElementById("submit");
let useAppCb = document.getElementById("useApp");
let firstMessageTb = document.getElementById("firstMessage");

chrome.storage.sync.get("useApp, firstMessage", ({ useApp, firstMessage }) => {
    useAppCb.checked = useApp;
    firstMessageTb.textContent = firstMessage
});

submitBtn.addEventListener("click", async () => {
    chrome.storage.sync.set({
        "useApp": useAppCb.checked,
        "firstMessage": firstMessageTb.textContent
    });
});