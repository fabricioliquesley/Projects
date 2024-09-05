document.getElementById("collectElements").addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("#text_input")

  chrome.runtime.sendMessage({ action: "collectElements", query: input.value });
});

document.getElementById("save_button").addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "saveElements" });
})