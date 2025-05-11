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
}

loadHeader();