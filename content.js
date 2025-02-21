let preferences;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autoApply") {
    preferences = request.preferences;
    autoApplyProcess();
  }
});

async function autoApplyProcess() {
  if (window.location.pathname === "/login/") {
    await login();
  } else if (window.location.pathname === "/candidate/opportunities/") {
    await applyToJobs();
  }
}

async function login() {
  document.getElementById("email").value = preferences.email;
  document.getElementById("password").value = preferences.password;
  document.getElementById("login-form").children[0].click();
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for login
  window.location.href = "https://www.instahyre.com/candidate/opportunities/";
}

async function applyToJobs() {
  const { data } = await fetch(
    `https://www.instahyre.com/api/v1/job_search?jobLocations=${encodeURIComponent(
      preferences.location
    )}&skills=${encodeURIComponent(preferences.skills)}&job_type=${
      preferences.jobType
    }&years=${preferences.experience}`
  ).then((res) => res.json());

  for (const obj of data.objects) {
    window.location.href = obj.public_url;
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for page load

    const applyButton = document.querySelector(".apply-button");
    if (applyButton) {
      applyButton.click();
      console.log("Applied to job ID:", obj.id);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for application to be sent
    }
  }

  alert("Auto-apply process completed!");
}
