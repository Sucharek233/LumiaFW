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
};

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
        wrapper.className = "advSearchInputContainer search-field-group";

        const names = advNames[tableColumn];
        const tableColumnName = document.createElement("label");
        tableColumnName.className = "search-field-label";
        tableColumnName.textContent = `${names[0]}:`;
        tableColumnName.setAttribute("for", `advSearchInput-${tableColumn}`);
        
        const tableColumnInput = document.createElement("input");
        tableColumnInput.className = "advSearchInput search-field-input";
        tableColumnInput.id = `advSearchInput-${tableColumn}`;
        tableColumnInput.dataset["column"] = tableColumn;
        tableColumnInput.placeholder = names[1];

        wrapper.append(tableColumnName);
        wrapper.append(tableColumnInput);
        advSearchInputs.append(wrapper);
    });

    advSearchInputsContainer.scrollIntoView({behavior: "smooth"});
}

advSearchInputs.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        performAdvSearch();
    }
});

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
        }

        return input;
    }

    function getCardRow(label, value) {
        let row = `
            <div class="infoRow">
                  <span class="infoLabel">${label}:</span>
                  <span class="infoValue">${processValue(value)}</span>
            </div>
        `;

        return row;
    }

    // allValues.forEach(values => {
    //     const resultEl = document.createElement("div");
    //     resultEl.className = "advResult";
        
    //     let info = "";
    //     values.forEach((value, index) => {
    //         if (advExclusions[activeTableSelection].includes(columns[index])) {return;} // what a one-liner

    //         const processedValue = processValue(value);
    //         const columnName = advNames[columns[index]][0];
    //         info += `<p><b>${columnName}:</b> ${processedValue}</p>`;
    //     });
    //     resultEl.innerHTML = info;

    //     advResults.append(resultEl);
    // });

    allValues.forEach(values => {
        const resultEl = document.createElement("div");
        resultEl.className = "card cardContent";
        
        let info = "";
        values.forEach((value, index) => {
            if (advExclusions[activeTableSelection].includes(columns[index])) {return;} // what a one-liner

            info += getCardRow(columns[index], value);
        });
        
        resultEl.innerHTML = info;

        advResults.append(resultEl);
    });

    advResults.scrollIntoView({behavior: "smooth"});
}