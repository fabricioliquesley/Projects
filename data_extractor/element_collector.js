chrome.runtime.onMessage.addListener(async function (request, _sender, _sendResponse) {
  if (request.action === "collectElements") {
    let elements = document.querySelectorAll(request.query)

    alert(`Foram encontrados ${elements.length} elementos`)

    const values = Array.from(elements)
      .reduce((json_object, element, index) => {
        json_object[`element_${index}`] = element.outerHTML

        return json_object
      }, {})

    console.log(values)

    chrome.storage.local.set(values)

  } else if (request.action === "saveElements") {
    const response = await chrome.storage.local.get()

    const value_blob = new Blob([JSON.stringify(response)], { type: 'application/json' });

    let blobURL = URL.createObjectURL(value_blob)

    chrome.runtime.sendMessage({ action: "downloadBlob", blobURL: blobURL });
  } else if (request.action === "revokeBlob") {
    URL.revokeObjectURL(request.blobURL);
  }
});
