let lastSelectedSidebar;
let modelEntires = [];


function getLumiaSeries(str) {
    const match = str.match(/Lumia\s(\d+)/i);
    const fullNum = match[1];
    const seriesLength = fullNum.length - 1; // 720 => 7; 1520 => 15
    const seriesNum = fullNum.slice(0, seriesLength) + "0";

    return seriesNum;
}

function loadSidebar() {
    let lastSeries = "";
    Object.keys(models).forEach(model => {
        const modelEntry = document.createElement("button");
        modelEntry.className = "modelEntry";
        modelEntry.textContent = model;
        modelEntry.onclick = function() {
            sidebar.classList.remove("open");
            if (lastSelectedSidebar) {
                if (lastSelectedSidebar.textContent == model) {
                    return;
                }
            }

            selectStyleSidebar(modelEntry);
            const rms = models[model];
            showResults(model, rms);
        };

        const series = getLumiaSeries(model);
        if (series != lastSeries) {
            const modelGroup = document.createElement("div");
            modelGroup.className = "modelGroup";
            modelGroup.id = `series-${series}`;
            modelGroup.textContent = `Lumia ${series} Series`;
            modelContainer.append(modelGroup);
        }
        lastSeries = series;

        modelEntires.push(modelEntry);
        modelContainer.append(modelEntry);
    });
}

function selectStyleSidebar(element) {
    if (lastSelectedSidebar) {
        lastSelectedSidebar.classList.remove("selected");
    }
    
    element.classList.add("selected");
    lastSelectedSidebar = element;
    lastSelectedResults = undefined;
}