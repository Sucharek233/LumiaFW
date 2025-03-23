function removeByClassName(className) {
    let elements = document.getElementsByClassName(className);
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

const linkPriorities = [
    "drive.google.com",
    "onedrive",
    "mega",
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
function showResults(model, rms) {
    title.innerText = `Showing results for ${model}`;
    removeByClassName("rmEntry");
    removeByClassName("card");

    let rmEntries = [];
    rms.forEach(rm => {
        const rmEl = document.createElement("div");
        rmEl.className = "rmEntry";
        rmEl.textContent = rm;

        rmEl.onclick = function() {
            if (lastSelectedResults) {
                if (lastSelectedResults.textContent == rm) {
                    return;
                }
            }

            selectStyleResults(rmEl);
            removeByClassName("card");
            let infos = getRM(rm);
            infos = sortResultsByLinks(infos, 5);
            let emFiles = getEmergency(rm);
            
            if (emFiles) {
                emFiles = sortResultsByLinks(emFiles, 1);
                const emFilesEl = document.createElement("div");
                emFilesEl.className = "card cardEm";
                let emFilesText = "<b>Emergency files</b> (mirrors):<br>"
                emFiles.forEach(emFile => {
                    emFilesText += `<br>
                        <p><b>File name:</b> ${emFile[0]}</p>
                        <p><b>Link:</b> <a href=${emFile[1]}>${emFile[1]}</a></p>
                    `;
                });
                emFilesEl.innerHTML = emFilesText;
                cards.append(emFilesEl);
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
                    <p><b>Hardware model:</b> ${rm}</p>
                    <p><b>Country code:</b> ${info[1]}</p>
                    <p><b>Country info:</b> ${info[2]}</p>
                    <p><b>Firmware:</b> ${info[3]}</p>
                    <p><b>File name:</b> ${info[4]}</p>
                    <p><b>Link:</b> <a href="${info[5]}">${info[5]}</a></p>
                `
        
                cards.append(card);
                // console.log(info);
            });
        }

        rmEntries.push(rmEl)
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
    resize();
}