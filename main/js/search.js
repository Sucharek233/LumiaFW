function performSearch() {
    modelEntires.forEach(modelEntry => {
        modelEntry.style.display = "flex";
        const groups = document.getElementsByClassName("modelGroup");
        for (const group of groups) {
            group.style.display = "flex";
        }
    });

    const text = searchInput.value;
    if (text.trim() == "") return;

    const groups = document.getElementsByClassName("modelGroup");
    for (const group of groups) {
        group.style.display = "none";
    }

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
    
    let lastModel = "";
    modelEntires.forEach(modelEntry => {
        if (models.includes(modelEntry.textContent)) {
            modelEntry.style.display = "flex";

            const model = modelEntry.textContent;
            if (lastModel != model) {
                const series = getLumiaSeries(model);
                const group = document.getElementById(`series-${series}`);
                group.style.display = "flex";
            }
            lastModel = model;
        } else {
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