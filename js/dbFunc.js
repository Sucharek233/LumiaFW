let db;

async function extractDb() {
    async function loadDbFile() {
        const response = await fetch("database/database.zip");
        const blob = await response.blob();
    
        const file = new File([blob], "downloaded_file", { type: blob.type });
    
        return file;
    }
    const dbFile = await loadDbFile();

    Unarchiver.open(dbFile).then(async function (archive) {
        for (let entry of archive.entries) {
            if (entry.is_file) {
                let entry_file = await entry.read();
                loadDb(entry_file);
            }
        }
    });
}

async function loadDb(dbFile) {
    const sql = await initSqlJs({
        locateFile: file => "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.wasm"
    });

    const firmwareDbFile = dbFile;
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

function getEmergency(rm) {
    const result = db.exec(`SELECT file_name, link FROM emergency WHERE rm='${rm}'`);
    if (result.length == 0) {
        return false;
    }

    return result[0]["values"];
}

extractDb();