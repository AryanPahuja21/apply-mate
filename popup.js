document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const linkedinInput = document.getElementById("linkedin");
  const saveBtn = document.getElementById("save-btn");
  const statusMessage = document.getElementById("status-message");

  chrome.storage.sync.get(["name", "email", "phone", "linkedin"], (data) => {
    nameInput.value = data.name || "";
    emailInput.value = data.email || "";
    phoneInput.value = data.phone || "";
    linkedinInput.value = data.linkedin || "";
  });

  saveBtn.addEventListener("click", () => {
    chrome.storage.sync.set(
      {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        linkedin: linkedinInput.value,
      },
      () => {
        statusMessage.classList.remove("hidden");
        setTimeout(() => statusMessage.classList.add("hidden"), 2000);
      }
    );
  });
});
