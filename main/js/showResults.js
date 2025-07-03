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

    function getCardRow(label, value, link = 0) {
        let row = `
            <div class="infoRow">
                  <span class="infoLabel">${label}:</span>
                  <span class="infoValue">
        `;
        if (link) {
            row += `<a href="${value}">${value}</a>`;
        } else {
            row += value;
        }
        row += "</div>";

        return row;
    }

    let ccSections = {};

    selectStyleResults(rmEl);
    removeByClassName("card");
    removeByClassName("ccSection");

    let infos = getRM(rm);
    infos = sortResultsByLinks(infos, 5);

    let emFiles = getEmergency(rm);
    if (emFiles) {
        ccSections["Emergency Files"] = [];
        
        emFiles = sortResultsByLinks(emFiles, 1);
        emFiles.unshift(["Collection of all emergency files", "https://protobetatest.com/download/lumia-emergency-files"]);
        emFiles.forEach(emFile => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <div class="countryBadge">
                    Emergency Files
                </div>
                <div class="cardContent">
                    ${getCardRow("Info", emFile[0])}
                    ${getCardRow("Link", emFile[1], 1)}
                </div>
            `;
            ccSections["Emergency Files"].push(card);

            cards.append(card);
        });
    } else {
        // const emFilesEl = document.createElement("div");
        // emFilesEl.className = "card cardEm";
        // emFilesEl.innerHTML = `<p><b>No emergency files available for this model!</b</p>`;
        // cards.append(emFilesEl);
    }

    infos.forEach(info => {
        const card = document.createElement("div");
        card.className = "card";

        info.forEach((inf, index) => {
            if (inf == "") {
                info[index] = "N/A";
            }
        });

        card.innerHTML = `
            <div class="countryBadge">
                ${info[1]}
            </div>
            <div class="cardContent">
                ${getCardRow("Hardware model", rm)}
                ${getCardRow("Country code", info[1])}
                ${getCardRow("Country info", info[2])}
                ${getCardRow("Firmware", info[3])}
                ${getCardRow("File name", info[4])}
                ${getCardRow("Link", info[5], 1)}
            </div>
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
        if (cc == "Emergency Files") {
            section.className = "ccSection ccSectionEm";
        }

        // const sectionName = document.createElement("p");
        // sectionName.className = "ccSectionName";
        // sectionName.textContent = cc;
        // section.append(sectionName);

        ccSections[cc].forEach((firmwareCard, index) => {
            const ccSectionHeader = firmwareCard.children[0];
            if (index == 0) {
                section.append(ccSectionHeader);
            } else {
                ccSectionHeader.remove();
            }
            
            section.append(firmwareCard);
        });

        cards.append(section);
    });

}

function showResults(model, rms) {
    title.innerText = model;
    removeByClassName("rmEntry");
    removeByClassName("card");
    removeByClassName("ccSection");

    let rmEntries = [];
    rms.forEach(rm => {
        const rmEl = document.createElement("button");
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