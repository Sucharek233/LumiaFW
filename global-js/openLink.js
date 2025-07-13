const linkDetect = [
    "https://support.halabtech.com",
    "https://t.me"
];

const linkDetectMsg = [
    [
        "⚠️ Important Notice About HalabTech Downloads",
        `Please be aware of the following limitations:<br>
            You <strong>must create a free account</strong> to download files.<br>
            There is a <strong>daily download limit of 3 files</strong> per account.<br>
            Some files <strong>may be paid</strong>. If a download requires payment, <strong>do not buy it</strong> - try to find an alternative free link instead.<br><br>

        If you experience issues with HalabTech, please use a <strong>different link</strong>.`
    ],
    [
        "⚠️ Important Notice About Telegram Downloads",
        `Before proceeding, please be aware:<br>
            You <strong>must have a Telegram account</strong> to access the files.<br>
            You'll need to use the <strong>Telegram mobile or desktop app</strong> - files <strong>cannot be downloaded directly</strong> from the web preview.<br><br>

        If you don't have Telegram installed, you can download it <a href="https://telegram.org/apps" target="_blank">here</a>.`
    ]
];

function getBaseUrlExtra(url) {
    const parsedUrl = new URL(url);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.port ? `:${parsedUrl.port}` : ''}`;

    return baseUrl;
}

// I couldn't think of a good name to give to these functions lmao
function linkDialogDontShowAgain(url) {
    localStorage.setItem(url, 1);
}
function linkDialogCheckDontShowAgain(url) {
    const result = localStorage.getItem(url);
    if (result) {
        return true;
    }

    return false;
}

function openLink(url, warningShown = false) {
    console.log(url);
    const baseUrl = getBaseUrlExtra(url);
    const urlIgnored = linkDialogCheckDontShowAgain(baseUrl);
    if (linkDetect.includes(baseUrl) && !warningShown && !urlIgnored) {
        const urlIndex = linkDetect.indexOf(baseUrl);
        const msg = linkDetectMsg[urlIndex];

        linkDialogBtnDontShowAgain.onclick = function() {
            linkDialogDontShowAgain(baseUrl);
            closeDialog();
            openLink(url);
        };
        
        openLinkDialog(msg[0], msg[1], url);
        return;
    }

    window.open(url, '_blank', '');
}