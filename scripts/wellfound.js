chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autoApplyWellfound") {
      sendResponse("started");
      const jobListings = document.querySelectorAll(".styles_component__Ey28k");
      console.log("Job listings found:", jobListings.length);
  
      if (jobListings.length > 0) {
        localStorage.setItem("wellfound-loop-count", jobListings.length);
        applyToJobsWellfound();
      }
    }
  });
  
  function applyToJobsWellfound() {
    let jobListings = document.querySelectorAll(".styles_component__Ey28k");
    let loopCount = localStorage.getItem("wellfound-loop-count");
  
    if (loopCount && loopCount > 0) {
      let currentJob = jobListings[jobListings.length - loopCount];
      console.log("Current job:", currentJob);
  
      if (currentJob) {
        // Click the "Learn more" button
        let learnMoreButton = currentJob.querySelector(
          'button[data-test="LearnMoreButton"]'
        );
        console.log("Learn more button found:", learnMoreButton);
  
        if (learnMoreButton) {
          learnMoreButton.click();
  
          setTimeout(() => {
            // Wait for the first modal to open
            let applyButton = document.querySelector(
              'button.styles-module_component__88XzG.styles_component__Ov6jE'
            );
            console.log("Apply button found:", applyButton);
  
            if (applyButton) {
              applyButton.click();
  
              setTimeout(() => {
                // Wait for the second modal to open
                let sendApplicationButton = document.querySelector(
                  'button[data-test="JobApplicationModal--SubmitButton"]'
                );
                console.log("Send application button found:", sendApplicationButton);
  
                if (sendApplicationButton) {
                  // Click the "Send application" button
                  sendApplicationButton.click();
  
                  // Wait for the application to be sent
                  setTimeout(() => {
                    // Close the modal or move to the next job
                    let closeButton = document.querySelector(
                      ".ReactModal__Content .close-button"
                    );
                    console.log("Close button found:", closeButton);
  
                    if (closeButton) {
                      closeButton.click();
                    }
  
                    // Decrement the loop count and continue
                    localStorage.setItem("wellfound-loop-count", loopCount - 1);
                    applyToJobsWellfound();
                  }, 2000); // Wait for the application to be sent
                }
              }, 2000); // Wait for the second modal to open
            }
          }, 2000); // Wait for the first modal to open
        }
      }
    } else {
      localStorage.removeItem("wellfound-loop-count");
    }
  }