chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autoApply") {
        const mainDiv = document.querySelectorAll("#internship_list_container_1 > div");
        if (mainDiv) {
            sendResponse("started");
            localStorage.setItem("apply-mate-loop-count", mainDiv.length);
            applyToJobs();
        }
    }
});

if (localStorage.getItem("apply-mate-loop-count")) {
    applyToJobs();
}

function applyToJobs() {

    setTimeout(() => {
        const mainDiv = document.querySelectorAll("#internship_list_container_1 > div");
        mainDiv[0].click();
        setTimeout(() => {
            document.getElementById("continue_button").click();
            setTimeout(() => {
                if (document.getElementById("cover_letter")) {
                    document.getElementById("cover_letter").value = "I my new in tech , so just need to start my career"
                }
                if (document.querySelectorAll(".additional_question").length > 0) {
                    document.querySelectorAll(".additional_question").forEach((q) => {
                        if (q.querySelector('textarea')) {
                            q.querySelector('textarea').value = "hello i am beginner"
                        } else if (q.querySelector('input[type="number"')) {
                            q.querySelector('input[type="number"').value = 0
                        } else if (q.querySelector('input[type="radio"')) {
                            q.querySelector('input[type="radio"').checked = true;
                        } else if (q.querySelector('select')) {
                            q.querySelector('select').children[1].selected = true;
                        }
                    })
                }
                setTimeout(() => {
                    document.getElementById("submit").click();
                }, 500);
                setTimeout(() => {
                    let loopCount = localStorage.getItem("apply-mate-loop-count");
                    if (loopCount) {
                        localStorage.setItem("apply-mate-loop-count", loopCount - 1);
                        if (loopCount == 0) {
                            localStorage.removeItem("apply-mate-loop-count");
                        }
                    }
                    setTimeout(() => {
                        document.querySelector("#dismiss_similar_job_modal").click();
                        if (localStorage.getItem("apply-mate-loop-count")) {
                            applyToJobs();
                        }
                    }, 1000);
                }, 500);
            }, 500);
        }, 1500);
    }, 1000);

}
