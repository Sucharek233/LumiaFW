function performSearch() {
    removeElementChildren(rmResults);
    
    const input = rmInput.value.trim();
    if (input == "") {return;}
    
    const results = searchLumia(input);

    if (!results && input != "") {
        const noRes = document.createElement("p");
        noRes.textContent = "No results!";
        rmResults.append(noRes);
        return;
    }

    function highlightQuery(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<span>$1</span>");
    }
    
    // yes, this sorting function was written by chatgpt :)
    results.sort((a, b) => {
        const extractNumber = str => {
            const match = str.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
        };
    
        const nameA = a.model || a.lumia || "";
        const nameB = b.model || b.lumia || "";
    
        const baseA = nameA.match(/Lumia \d+/)?.[0] || nameA;
        const baseB = nameB.match(/Lumia \d+/)?.[0] || nameB;
    
        if (baseA === baseB) {
            return nameA.localeCompare(nameB); // Sort by full name when base matches
        }
    
        return extractNumber(baseA) - extractNumber(baseB);
    });
    

    results.forEach(result => {
        const container = document.createElement("div");
        container.classList.add("rmResult");
        
        if (result["rm"]) {
            
            const res = `<h4>${result["rm"]}</h4><p>${result["lumia"]}</p>`;
            container.innerHTML = highlightQuery(res, input);
        } else {
            const rmsListStr = result["rms"]
                .map(rm => `<p>${highlightQuery(rm, input)}</p>`)
                .join("");

            container.innerHTML = highlightQuery(`<h4>${result["model"]}</h4>${rmsListStr}`, input); 
        }
        
        rmResults.append(container);
    });
}