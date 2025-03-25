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