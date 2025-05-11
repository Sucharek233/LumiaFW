function showFeedbackOverlay() {
    feedbackOverlay.classList.add("shown");
}
function hideFeedbackOverlay() {
    feedbackOverlay.classList.remove("shown");
}

const feedbackResults = {
    title: undefined,
    message: undefined
};

const requiredFeedbackFields = ["title", "message"];

function loadFeedbackOverlay() {
    for (let field of Object.keys(feedbackResults)) {
        const info = advNames[field];

        const container = document.createElement("div");
        container.className = "feedbackInput";

        let input; // man this sucks
        if (field == "message") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
        }
        input.className = "searchBox feedbackInputEl";
        input.placeholder = info[1];
        input.onchange = function() {
            feedbackResults[field] = input.value;
        };

        container.append(input);

        feedbackInputs.append(container);
    }
}

async function prepareFeedback() {
    let notFilledOut = [];
    for (let requiredField of requiredFeedbackFields) {
        if (!feedbackResults[requiredField] || feedbackResults[requiredField].trim() == "") {
            notFilledOut.push(advNames[requiredField][0]);
        }
    }

    if (notFilledOut.length != 0) {
        showOverlayCustom(
            "One or more fields not filled out!",
            `Please fill out <b>${notFilledOut.join(", ")}</b> field(s) before sending feedback!`
        );
        return;
    }

    let results = [];
    for (let key of Object.keys(feedbackResults)) {
        results.push(feedbackResults[key]);
    }
    
    const saveVerify = feedbackResults.message;
    feedbackBtn.textContent = "Sending, please wait...";
    feedbackBtn.setAttribute("disabled", "");

    const verify = await sendFeedback(...results);
    
    feedbackBtn.textContent = "Send";
    feedbackBtn.removeAttribute("disabled");
    
    if (saveVerify == verify["message"]) {
        showOverlayCustom(
            "Success!",
            `Thank you for sending feedback :D`
        );
        hideFeedbackOverlay();

        const clearElements = document.getElementsByClassName("feedbackInputEl");
        for (let clearElement of clearElements) {
            clearElement.value = "";
        }

        for (let key of Object.keys(feedbackResults)) {
            feedbackResults[key] = undefined;
        }
    } else {
        showOverlayCustom(
            "Failed!",
            `Your feedback wasn't sent successfully.<br>
             Please try again later or contact me personally (contacts are in the About section).`
        );
    }
}