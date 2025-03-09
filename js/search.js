function searchLumia(query) {
    let results = [];

    // Fuzzy search Lumia names
    const fuzzyLumiaResults = fuzzysort.go(query, Object.keys(models));
    if (fuzzyLumiaResults.length > 0) {
        fuzzyLumiaResults.forEach(result => {
            results.push({ model: result.target, rms: models[result.target] });
        });
    }

    // Fuzzy search RM codes
    const fuzzyRMResults = fuzzysort.go(query, rmList);
    if (fuzzyRMResults.length > 0) {
        fuzzyRMResults.forEach(result => {
            results.push({ rm: result.target, lumia: rmToLumia[result.target][0] });
        });
    }

    return results.length > 0 ? results : null; // Return all matches or null if none found
}

function performSearch() {
    modelEntires.forEach(modelEntry => {
        modelEntry.style.display = "flex";
    });

    const text = searchInput.value;
    if (text.trim() == "") return;

    const targets = searchLumia(text);
    if (!targets) {
        modelEntires.forEach(modelEntry => {
            modelEntry.style.display = "none";
        });

        return;
    }

    let models = [];
    targets.forEach(target => {
        if (target["model"]) {
            models.push(target["model"]);
        } else {
            models.push(target["lumia"]);
        }
        
    });
    
    modelEntires.forEach(modelEntry => {
        if (!models.includes(modelEntry.textContent)) {
            modelEntry.style.display = "none";
        }
    });

    if (models.length != 1) {
        return;
    }

    // automatically select if only one remains
    let targetRM;
    let targetModel;
    if (targets[0]["rms"]) {
        const rms = targets[0]["rms"];
        if (rms.length != 1) {
            return;
        }

        targetModel = targets[0]["model"];
        targetRM = rms[0];
    } else {
        targetRM = targets[0]["rm"];
        targetModel = targets[0]["lumia"];
    }

    modelEntires.forEach(modelEntry => {
        if (modelEntry.textContent == targetModel) {
            modelEntry.dispatchEvent(new Event('click'));
        }

        const rms = document.getElementsByClassName("rmEntry");
        Array.from(rms).forEach(rm => {
            if (rm.textContent == targetRM) {
                rm.dispatchEvent(new Event('click'));
            }
        });
    });
}