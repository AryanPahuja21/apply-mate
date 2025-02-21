document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("preferencesForm");
  const statusDiv = document.getElementById("status");

  // Load saved preferences
  chrome.storage.sync.get(
    ["email", "jobType", "skills", "experience", "location"],
    (result) => {
      document.getElementById("email").value = result.email || "";
      document.getElementById("jobType").value = result.jobType || "0";
      document.getElementById("skills").value = result.skills || "";
      document.getElementById("experience").value = result.experience || "1";
      document.getElementById("location").value = result.location || "";
    }
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const preferences = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      jobType: document.getElementById("jobType").value,
      skills: document.getElementById("skills").value,
      experience: document.getElementById("experience").value,
      location: document.getElementById("location").value,
    };

    // Save preferences (except password)
    chrome.storage.sync.set(
      {
        email: preferences.email,
        jobType: preferences.jobType,
        skills: preferences.skills,
        experience: preferences.experience,
        location: preferences.location,
      },
      () => {
        statusDiv.textContent = "Preferences saved!";
      }
    );

    // Send message to background script to start auto-apply process
    chrome.runtime.sendMessage(
      { action: "startAutoApply", preferences: preferences },
      (response) => {
        if (response && response.status === "started") {
          statusDiv.textContent =
            "Auto-apply process started. Please check the Instahyre tab.";
        } else {
          statusDiv.textContent = "Error starting auto-apply process.";
        }
      }
    );
  });
});
