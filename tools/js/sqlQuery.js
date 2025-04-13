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
                input = `<a href="${input}">${input}</a>`;
            }
        }

        return input;
    }

    allValues.forEach(values => {
        const resultEl = document.createElement("div");
        resultEl.className = "sqlResult";
        
        let info = "";
        values.forEach((value, index) => {
            const processedValue = processValue(value);
            info += `<p><b>${columns[index]}:</b> ${processedValue}</p>`;
        });
        resultEl.innerHTML = info;

        sqlResults.append(resultEl);
    });
}