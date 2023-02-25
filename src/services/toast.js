const toast = document.getElementById("toast");
let id = 1;

function createToast(msg, success) {
  const toastMsg = document.createElement("div");
  toastMsg.id = `toastMsg-${id++}`;
  toastMsg.classList.add(success ? "success" : "error");
  toastMsg.innerHTML = `${msg}<div class="toast-timer"></div>`;
  return toastMsg;
}

function showToast(msg, success = true) {
  const toastMsg = createToast(msg, success);
  toast.appendChild(toastMsg);
  setTimeout(() => {
    toastMsg.remove();
  }, 3000);
}

export default showToast;
