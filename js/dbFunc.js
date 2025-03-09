let db;

async function loadDb() {
    const sql = await initSqlJs({
        locateFile: file => "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.wasm"
    });

    const firmwareDbFile = await fetch("database/database.db");
    const buffer = await firmwareDbFile.arrayBuffer();
    db = new sql.Database(new Uint8Array(buffer));

    getModels();
}

let models = {};

let rmToLumia = {};
let rmList = [];
function getModels() {
    const modelsRaw = db.exec("SELECT DISTINCT rm, friendly_name FROM firmware;")[0]["values"];
    modelsRaw.forEach(model => {
        const rm = model[0];
        const name = model[1];

        if (!models[name]) {
            models[name] = [];
        }
        models[name].push(rm);
    });

    // sorting
    models = Object.entries(models)
        .sort(([a], [b]) => {
            // Extract numeric parts from model names
            const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
            return numA - numB;
        })
        .reduce((acc, [key, value]) => {
            // Sort the RM-XXX values numerically
            const sortedValues = value.sort((rmA, rmB) => {
                const numA = parseInt(rmA.match(/\d+/)?.[0] || "0", 10);
                const numB = parseInt(rmB.match(/\d+/)?.[0] || "0", 10);
                return numA - numB;
            });
            acc[key] = sortedValues;
            return acc;
        }, {});

    Object.entries(models).forEach(([model, rms]) => {
        rms.forEach(rm => {
            if (!rmToLumia[rm]) rmToLumia[rm] = [];
            rmToLumia[rm].push(model);
            rmList.push(rm); // Collect RM codes for fuzzy searching
        });
    });

    loadSidebar();
}

function getRM(rm) {
    return db.exec(`SELECT friendly_name, rm, country_code, country_info, fw_info, file_name, link FROM firmware WHERE rm='${rm}'`)[0]["values"];
}

loadDb();