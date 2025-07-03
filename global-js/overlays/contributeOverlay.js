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
        container.className = "input-group";

        let input;
        if (field == "notes") {
            input = document.createElement("textarea");
            input.setAttribute("rows", 3);
            container.className = "input-group full-width";
        } else {
            input = document.createElement("input");
        }
        
        input.id = `contribute-${field}`;
        input.className = "contributeInputEl";
        input.placeholder = info[1];
        input.onchange = function() {
            contributeResults[field] = input.value;
        };

        const label = document.createElement("label");
        label.setAttribute("for", `contribute-${field}`);
        label.textContent = info[0];
        if (requiredContributeFields.includes(field)) {
            label.className = "required";
        }
        
        container.append(label);
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
        openInfoDialogCustom(
            "One or more fields not filled out!",
            `Please fill out <b>${notFilledOut.join(", ")}</b> field(s) before sending your contribution!`
        );
        return;
    }

    let results = [];
    for (let key of Object.keys(contributeResults)) {
        results.push(contributeResults[key]);
    }
    console.log(results);
    
    const saveVerify = contributeResults.link;
    contributeBtn.textContent = "Sending, please wait...";
    contributeBtn.setAttribute("disabled", "");

    const verify = await sendFirmware(...results);
    
    contributeBtn.textContent = "Send";
    contributeBtn.removeAttribute("disabled");
    
    if (saveVerify == verify["link"]) {
        closeDialog();
        openInfoDialogCustom(
            "Success!",
            `Thank you for sending your contribution :D`
        );

        const clearElements = document.getElementsByClassName("contributeInputEl");
        for (let clearElement of clearElements) {
            clearElement.value = "";
        }

        for (let key of Object.keys(contributeResults)) {
            contributeResults[key] = undefined;
        }
    } else {
        openInfoDialogCustom(
            "Failed!",
            `Your contribution wasn't sent successfully.<br>
             Please try again later or contact me personally (contacts are in the About section).`
        );
    }
}