let lastSelectedSidebar;

function loadSidebar() {
    Object.keys(models).forEach(model => {
        const modelEntry = document.createElement("div");
        modelEntry.className = "modelEntry";
        modelEntry.textContent = model;
        modelEntry.onclick = function() {
            if (lastSelectedSidebar) {
                if (lastSelectedSidebar.textContent == model) {
                    return;
                }
            }
            
            selectStyleSidebar(modelEntry);
            const rms = models[model];
            showResults(model, rms);
        }

        modelContainer.append(modelEntry);
    });
}

function selectStyleSidebar(element) {
    if (lastSelectedSidebar) {
        lastSelectedSidebar.classList.remove("selected");
    }
    
    element.classList.add("selected");
    lastSelectedSidebar = element;
}