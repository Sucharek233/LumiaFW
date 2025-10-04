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

    fetch("https://pzqiqnbzcmmmxrovnnit.supabase.co/functions/v1/counter").then(async function(result) {
        const counter = await result.json();
        supabaseCounter.textContent = counter.counter;
    });

    // without the timeout the fade in animation doesn't trigger
    const urlParams = new URLSearchParams(window.location.search);
    const disableLdbDialog = urlParams.get('dldb');
    if (!disableLdbDialog) {
        setTimeout(function() {
            openDialog('lumiadb');
        }, 10);
    }
}

loadHeader();