function removeByClassName(className) {
    let elements = document.getElementsByClassName(className);
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
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
            const infos = getRM(rm);

            infos.forEach(info => {
                const card = document.createElement("div");
                card.className = "card";
        
                info.forEach((inf, index) => {
                    if (inf == "") {
                        info[index] = "N/A";
                    }
                });

                const infoElement = document.createElement("p");
                infoElement.innerHTML = `
                    <b>Hardware model:</b> ${rm}<br>
                    <b>Country code:</b> ${info[2]}<br>
                    <b>Country info:</b> ${info[3]}<br>
                    <b>Firmware:</b> ${info[4]}<br>
                    <b>File name:</b> ${info[5]}<br>
                    <b>Link:</b> <a href="${info[6]}">${info[6]}</a>
                `
        
                card.append(infoElement);
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