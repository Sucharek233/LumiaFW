function getBaseURL() {
    return `${window.location.origin}/LumiaFW`;
}

async function loadHeader() {
    const headerUrl = `${getBaseURL()}/global-elements/header.html`;
    
    const headerHTML = await fetch(headerUrl);
    header.innerHTML = await headerHTML.text();

    loadGlobalElementDeclaration();
    loadContributeOverlay();
    loadFeedbackOverlay();

    // Ill probably update the position of this counter (hopefully)
    fetch("https://pzqiqnbzcmmmxrovnnit.supabase.co/functions/v1/counter").then(async function(result) {
        const counter = await result.json();
        supaCounter = counter.counter;
    });
}

loadHeader();