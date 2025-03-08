function loadSidebar() {
    Object.keys(models).forEach(model => {
        const modelEntry = document.createElement("div");
        modelEntry.className = "modelEntry";
        modelEntry.textContent = model;
        modelEntry.onclick = function() {
            const rms = models[model];
            showResults(model, rms);
        }

        modelContainer.append(modelEntry);
    });
}