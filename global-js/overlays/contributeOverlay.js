function showContributeOverlay() {
    contributeOverlay.classList.add("shown");
}
function hideContributeOverlay() {
    contributeOverlay.classList.remove("shown");
}

const contributeResults = {
    rm: undefined,
    country_code: undefined,
    country_info: undefined,
    fw_info: undefined,
    file_name: undefined,
    link: undefined,
    credits: undefined,
    notes: undefined
};

const requiredContributeFields = ["rm", "link"];

function loadContributeOverlay() {
    for (let field of Object.keys(contributeResults)) {
        const info = advNames[field];

        const container = document.createElement("div");
        container.className = "contributeInput";

        const inputInfo = document.createElement("p");
        let textContent = info[0];
        if (requiredContributeFields.includes(field)) {
            textContent += "*";
        }
        inputInfo.textContent = `${textContent}:`;

        const input = document.createElement("input");
        input.className = "searchBox contributeInputEl";
        input.placeholder = info[1];
        input.onchange = function() {
            contributeResults[field] = input.value;
        };

        container.append(inputInfo);
        container.append(input);

        contributeInputs.append(container);
    }
}

async function prepareContribution() {
    let notFilledOut = [];
    for (let requiredField of requiredContributeFields) {
        if (!contributeResults[requiredField] || contributeResults[requiredField].trim() == "") {
            notFilledOut.push(advNames[requiredField][0]);
        }
    }

    if (notFilledOut.length != 0) {
        showOverlayCustom(
            "One or more fields not filled out!",
            `Please fill out <b>${notFilledOut.join(", ")}</b> field(s) before sending your contribution!`
        );
        return;
    }

    let results = [];
    for (let key of Object.keys(contributeResults)) {
        results.push(contributeResults[key]);
    }
    
    const saveVerify = contributeResults.link;
    contributeBtn.textContent = "Sending, please wait...";
    contributeBtn.setAttribute("disabled", "");

    const verify = await sendFirmware(...results);
    
    contributeBtn.textContent = "Send";
    contributeBtn.removeAttribute("disabled");
    
    if (saveVerify == verify["link"]) {
        showOverlayCustom(
            "Success!",
            `Thank you for sending your contribution :D`
        );
        hideContributeOverlay();

        const clearElements = document.getElementsByClassName("contributeInputEl");
        for (let clearElement of clearElements) {
            clearElement.value = "";
        }

        for (let key of Object.keys(contributeResults)) {
            contributeResults[key] = undefined;
        }
    } else {
        showOverlayCustom(
            "Failed!",
            `Your contribution wasn't sent successfully.<br>
             Please try again later or contact me personally (contacts are in the About section).`
        );
    }
}