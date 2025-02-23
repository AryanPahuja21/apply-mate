chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autoApply") {
    sendResponse("started");
    applyToJobs();
  }
});

function shiftLocalStorage() {
  const jobIDs = JSON.parse(localStorage.getItem("apply-mate-naukri-jobIds"));
  let first = jobIDs[0];
  jobIDs.shift();
  if (jobIDs.length == 0) {
    localStorage.removeItem("apply-mate-naukri-jobIds");
    return;
  }
  localStorage.setItem("apply-mate-naukri-jobIds", JSON.stringify(jobIDs));
  window.location.href = `https://www.naukri.com/job-listings-${first}`
}

window.addEventListener('load', () => {
  if (window.location.href.includes("naukri.com/myapply/")) {
    if (localStorage.getItem("apply-mate-naukri-jobIds")) {
      shiftLocalStorage();
    }
  } else if (window.location.href.includes("naukri.com/job-listings")) {
    if (localStorage.getItem("apply-mate-naukri-jobIds")) {
      setTimeout(() => {
        if (document.querySelector("#apply-button,#walkin-button")) {
          setTimeout(() => {
            document.querySelector("#apply-button,#walkin-button").click();
          }, 1000);
        } else if (document.querySelector("#company-site-button")) {
          shiftLocalStorage();
        }
      }, 1000);
    }
  } else if (window.location.href.includes("naukri.com/")) {
    setTimeout(() => {
      if (localStorage.getItem("apply-mate-naukri-jobIds")) {
        let mainDivs = document.querySelectorAll("div[data-job-id]");
        if (mainDivs.length > 0) {
          const jobIDs = [];
          mainDivs.forEach((art) => {
            jobIDs.push(art.getAttribute("data-job-id"));
          });
          setTimeout(() => {
            let first = jobIDs[0];
            jobIDs.shift();
            localStorage.setItem("apply-mate-naukri-jobIds", JSON.stringify(jobIDs));
            window.location.href = `https://www.naukri.com/job-listings-${first}`
          }, 200);
        }
      }
    },1500);
  }
});

function applyToJobs() {
  setTimeout(() => {
    if (document.querySelectorAll(".tab-wrapper")) {
      document.querySelectorAll(".tab-wrapper")[1].children[0].click();
      setTimeout(() => {
        let mainDiv = document.querySelectorAll(".list > article");
        const jobIDs = [];
        mainDiv.forEach((art) => {
          jobIDs.push(art.getAttribute("data-job-id"));
        });
        setTimeout(() => {
          let first = jobIDs[0];
          jobIDs.shift();
          localStorage.setItem("apply-mate-naukri-jobIds", JSON.stringify(jobIDs));
          window.location.href = `https://www.naukri.com/job-listings-${first}`
        }, 200);
      }, 500);
    }
  }, 1000);
}