const contact = document.querySelector(".wechat-contact");

if (contact) {
  const button = contact.querySelector(".wechat-copy");
  const id = contact.querySelector(".wechat-id");
  const status = contact.querySelector(".wechat-status");

  button.hidden = false;
  button.addEventListener("click", async () => {
    status.textContent = "";
    try {
      await navigator.clipboard.writeText(id.textContent.trim());
      status.textContent = status.dataset.copied;
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(id);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = status.dataset.fallback;
      }
    }
  });
}
