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

const qrLink = contact?.querySelector(".wechat-qr");
const qrDialog = document.querySelector("#wechat-qr-dialog");

if (qrLink && typeof qrDialog?.showModal === "function") {
  qrLink.setAttribute("aria-haspopup", "dialog");
  qrLink.setAttribute("aria-controls", qrDialog.id);
  qrLink.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (!qrDialog.open) qrDialog.showModal();
  });
}
