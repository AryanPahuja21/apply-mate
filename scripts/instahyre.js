chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autoApply") {
    sendResponse("started")
    const jobContainer = document.querySelector(".container > .row > div").children[1];
    if (jobContainer) {
      let mainDiv = document.querySelectorAll(".employer-row");
      localStorage.setItem("apply-mate-loop-count", mainDiv.length);
      applyToJobs();
    }
  }
});

function applyToJobs() {
  let mainDiv = document.querySelectorAll(".employer-row");

  let startingPoint = mainDiv[0];
  let applyButton = startingPoint.querySelector("button");

  if (applyButton) {
    applyButton.click();

    setTimeout(() => {
      let applyModal = document.querySelector(".application-modal-block >* .apply");
      if (applyModal) {
        applyModal.click();
      }
      setTimeout(() => {
        document.querySelectorAll(".application-modal-close").forEach((e) => {
          e.click();
        });
        setTimeout(() => {
          let loopCount = localStorage.getItem("apply-mate-loop-count");
          if (loopCount) {
            localStorage.setItem("apply-mate-loop-count", loopCount - 1);
            if (loopCount == 0) {
              localStorage.removeItem("apply-mate-loop-count");
            }
            applyToJobs();
          }
        }, 1000);
      }, 500);
    }, 1000);
  }
}
