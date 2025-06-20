const linkPriorities = [
    "drive.google.com",
    "mega",
    "onedrive",
    "lumiadb.com",
    "archive.org",
    "mediafire.com",
    "t.me",
    "support.halabtech.com",
    "firmwaredrive.com"
];
function sortResultsByLinks(info, linkIndex) {
    // Chatgpt saving my ass here xdddd
    info.sort((a, b) => {
        const linkA = a[linkIndex]; // Extract link
        const linkB = b[linkIndex];
    
        const priorityA = linkPriorities.findIndex(domain => linkA.includes(domain));
        const priorityB = linkPriorities.findIndex(domain => linkB.includes(domain));
    
        // If both links are in the list, sort by priority
        if (priorityA !== -1 && priorityB !== -1) {
            return priorityA - priorityB; 
        }
    
        // If only one link is in the list, it comes first
        if (priorityA !== -1) return -1;
        if (priorityB !== -1) return 1;
    
        // If neither link is in the list, sort alphabetically
        return linkA.localeCompare(linkB);
    });

    return info;
}

let lastSelectedResults;
function loadFirmwareCards(rm, rmEl) {
    if (lastSelectedResults) {
        if (lastSelectedResults.textContent == rm) {
            return;
        }
    }

    selectStyleResults(rmEl);
    removeByClassName("card");
    removeByClassName("ccSection");
    let infos = getRM(rm);
    infos = sortResultsByLinks(infos, 5);
    let emFiles = getEmergency(rm);
    
    if (emFiles) {
        emFiles = sortResultsByLinks(emFiles, 1);
        const emFilesEl = document.createElement("div");
        emFilesEl.className = "card cardEm";
        let emFilesText = `<p><b>Emergency files</b> (mirrors):</p>
                            <p><b>Collection of all emergency files:</b> <a href="https://protobetatest.com/download/lumia-emergency-files">https://protobetatest.com/download/lumia-emergency-files</a></p>`;
        emFiles.forEach(emFile => {
            emFilesText += `<br>
                <p><b>File name:</b> ${emFile[0]}</p>
                <p><b>Link:</b> <a href=${emFile[1]}>${emFile[1]}</a></p>
            `;
        });
        emFilesEl.innerHTML = emFilesText;
        cards.append(emFilesEl);
    } else {
        const emFilesEl = document.createElement("div");
        emFilesEl.className = "card cardEm";
        emFilesEl.innerHTML = `<p><b>No emergency files available for this model!</b</p>`;
        cards.append(emFilesEl);
    }

    let ccSections = {};

    infos.forEach(info => {
        const card = document.createElement("div");
        card.className = "card";

        info.forEach((inf, index) => {
            if (inf == "") {
                info[index] = "N/A";
            }
        });

        card.innerHTML = `
            <p><b>Hardware model:</b> ${rm}</p>
            <p><b>Country code:</b> ${info[1]}</p>
            <p><b>Country info:</b> ${info[2]}</p>
            <p><b>Firmware:</b> ${info[3]}</p>
            <p><b>File name:</b> ${info[4]}</p>
            <p><b>Link:</b> <a href="${info[5]}">${info[5]}</a></p>
        `;

        if (!ccSections[info[1]]) {
            ccSections[info[1]] = [];
        }
        ccSections[info[1]].push(card);

        cards.append(card);
        // console.log(info);
    });

    // if (Object.keys(ccSections).length == 1) {
    //     return;
    // }

    let ccSectionsKeys = Object.keys(ccSections);
    if (ccSectionsKeys.includes("N/A")) {
        ccSectionsKeys = ccSectionsKeys.filter(e => e !== "N/A");
        ccSectionsKeys.push("N/A");
    }

    ccSectionsKeys.forEach(cc => {
        const section = document.createElement("div");
        section.className = "ccSection";

        const sectionName = document.createElement("p");
        sectionName.className = "ccSectionName";
        sectionName.textContent = cc;
        section.append(sectionName);

        ccSections[cc].forEach(firmwareCard => {
            section.append(firmwareCard);
        });

        cards.append(section);
    });

}

function showResults(model, rms) {
    title.innerText = `Showing results for ${model}`;
    removeByClassName("rmEntry");
    removeByClassName("card");
    removeByClassName("ccSection");

    let rmEntries = [];
    rms.forEach(rm => {
        const rmEl = document.createElement("div");
        rmEl.className = "rmEntry";
        rmEl.textContent = rm;

        rmEl.onclick = function() {
            loadFirmwareCards(rm, rmEl);
        };

        rmEntries.push(rmEl);
        rmSelection.append(rmEl);
    });

    if (rmEntries.length < 2) {
        rmEntries[0].dispatchEvent(new Event('click'));
    }
}

function selectStyleResults(element) {
    if (lastSelectedResults) {
        lastSelectedResults.classList.remove("selected");
    }
    
    element.classList.add("selected");
    lastSelectedResults = element;
}