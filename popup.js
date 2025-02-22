document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("preferencesForm");
  const statusDiv = document.getElementById("status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusDiv.textContent = "Starting auto-apply process...";
    statusDiv.classList.add("loading");

    chrome.runtime.sendMessage(
      { action: "startAutoApply" },
      (response) => {
        statusDiv.classList.remove("loading");
        if (response && response.status === "started") {
          statusDiv.textContent = "Auto-apply process started.";
          statusDiv.classList.add("success");
        } else {
          statusDiv.textContent = "Error starting auto-apply process.";
          statusDiv.classList.add("error");
        }
      }
    );
  });
});
