async function runSqlQuery() {
    removeElementChildren(sqlResults);
    
    const input = sqlInput.value;
    
    let results;
    try {
        [results] = await db.exec(input);
    } catch (error) {
        const errCard = document.createElement("div");
        errCard.className = "sqlResult sqlErrResult";

        errCard.innerText = `${error.name} ${error.message}`;
        sqlResults.append(errCard);

        return;
    }

    if (!results) {
        const noRes = document.createElement("p");
        noRes.textContent = "No results!";
        sqlResults.append(noRes);

        return;
    }

    const columns = results["columns"];
    const allValues = results["values"];

    function processValue(input) {
        if (typeof(input) == "string") {
            input = input.replaceAll("\\n", " ");

            if (input.startsWith("http")) {
                input = `<a href="javascript:openLink('${input}')">${input}</a>`;
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

    allValues.forEach(values => {
        const resultEl = document.createElement("div");
        resultEl.className = "card cardContent";
        // let innerHTML = `
        //     <div class="cardContent">
        // `;
        
        let info = "";
        values.forEach((value, index) => {
            info += getCardRow(columns[index], value);
        });
        // innerHTML += "</div>";
        resultEl.innerHTML = info;

        sqlResults.append(resultEl);
    });
}

sqlQuery.addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        runSqlQuery();
    }
});