async function loadSelect() {
    const tables = await db.exec("select * from sqlite_sequence");
    tables[0]["values"].forEach(table => {
        const option = document.createElement("option");
        option.textContent = table[0];
        option.value = table[0];
        advTableSelect.append(option);
    });
}

advTableSelect.addEventListener("change", loadOptions);

const advExclusions = {
    firmware: ["created"],
    emergency: ["created"],
    models: ["created"]
}

const advNames = {
    id: ["ID", ""],
    message: ["Message", ""],
    rm: ["Hardware Model", "RM-821"],
    country_code: ["Country Code", "059Q971"],
    country_info: ["Country Info", ""],
    fw_info: ["Firmware", "3051.50009.1424.0008"],
    file_name: ["File Name", ""],
    link: ["Link", ""],
    friendly_name: ["Friendly Name", "Lumia 920"]
}

let activeTableSelection = "";
function loadOptions() {
    removeByClassName("advSearchInputContainer");
    removeByClassName("advResult");
    advSearchInputsContainer.style.display = "block";

    const selectedTable = advTableSelect.value;
    const tableColumns = getTableColumns(selectedTable, advExclusions[selectedTable]);
    activeTableSelection = selectedTable;

    tableColumns.forEach(tableColumn => {
        const wrapper = document.createElement("div");
        wrapper.className = "advSearchInputContainer";

        const names = advNames[tableColumn];
        const tableColumnName = document.createElement("p");
        tableColumnName.textContent = `${names[0]}:`;
        
        const tableColumnInput = document.createElement("input");
        tableColumnInput.className = "searchBox advSearchInput";
        tableColumnInput.dataset["column"] = tableColumn;
        tableColumnInput.placeholder = names[1];

        wrapper.append(tableColumnName);
        wrapper.append(tableColumnInput);
        advSearchInputs.append(wrapper);
    });
}

function performAdvSearch() {
    removeElementChildren(advResults);

    const inputs = document.getElementsByClassName("advSearchInput");

    let queries = [];
    Array.from(inputs).forEach(input => {
        const columnName = input.dataset["column"];
        let value = input.value;

        if (value == "") {
            return;
        }

        value = value.replaceAll("'", "\"");

        queries.push(`${columnName} like '${value}'`);
    });
    
    if (queries.length == 0) {
        return;
    }
    
    const query = `SELECT * FROM ${activeTableSelection} WHERE ${queries.join(" AND ")}`;
    const [results] = db.exec(query);

    if (!results) {
        const noRes = document.createElement("p");
        noRes.textContent = "No results!";
        advResults.append(noRes);

        return;
    }
    
    const columns = results["columns"];
    const allValues = results["values"];

    function processValue(input) {
        if (typeof(input) == "string") {
            input = input.replaceAll("\\n", " ");
            if (input.startsWith("http")) {
                input = `<a href="${input}">${input}</a>`;
            }

            if (input == "") {
                input = "N/A";
            }
        }

        return input;
    }

    allValues.forEach(values => {
        const resultEl = document.createElement("div");
        resultEl.className = "advResult";
        
        let info = "";
        values.forEach((value, index) => {
            if (advExclusions[activeTableSelection].includes(columns[index])) {return;} // what a one-liner

            const processedValue = processValue(value);
            const columnName = advNames[columns[index]][0];
            info += `<p><b>${columnName}:</b> ${processedValue}</p>`;
        });
        resultEl.innerHTML = info;

        advResults.append(resultEl);
    });
}