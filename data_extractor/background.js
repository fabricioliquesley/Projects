chrome.runtime.onMessage.addListener((message, sender, _sendResponse) => {
  if (message.action === "collectElements") {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      await chrome.tabs.sendMessage(tab.id, {
        action: "collectElements",
        query: message.query
      });
    })();
  } else if (message.action === "saveElements") {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      await chrome.tabs.sendMessage(tab.id, {
        action: "saveElements",
      });
    })();
  } else if (message.action === "downloadBlob") {
    chrome.downloads
      .download({
        url: message.blobURL,
        saveAs: true,
      })
      .then(() => {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "revokeBlob",
          blobURL: message.blobURL,
        });
      });
  }
});