const text = {
    "cr": [
        "Credits",
        `Thanks to all of these sources for making this site possible!<br><br>
        
        <a href="https://t.me/lumia_rm">Lumia Firmware Telegram group</a><br>
        <a href="https://support.halabtech.com/index.php?a=downloads&b=folder&id=113527">HalabTech Support</a><br>
        <a href="https://lumiadb.com">LumiaDB</a><br>
        <a href="https://firmwarefile.com/?s=lumia">Firmware File</a><br>
        <a href="https://archive.org/details/W10M_FFUs">Internet Archive #1</a><br>
        <a href="https://archive.org/details/nokia-wp-firmware">Internet Archive #2</a><br>

        Internet Archive (Listings with 1 file): <a href="https://archive.org/details/rm-1038-02177.00000.15184.36006-retail-prod-signed-1026-02743-e-000-nl">1</a>, 
                                                 <a href="https://archive.org/details/rm-998-var-apac-sg-cv">2</a>,
                                                 <a href="https://archive.org/details/950fw-no-ffu.-7z">3</a>,
                                                 <a href="https://archive.org/details/rm-983-02179.00000.15455.24047-retail-prod-signed-1001-02-fef-8-att-us">4</a>,
                                                 <a href="https://archive.org/details/10.0.10586.318.th2_release.160505-1801_ARMv7Fre_MobileCoreProd_RM-1104-EU_059X5C5_FFU">5</a>,
                                                 <a href="https://archive.org/details/10240-L950XL-L950FFUs">6</a>
        <br>

        <a href="https://drive.google.com/drive/folders/1bd--YJ-YIprDZBqB-dE8FNFGGWcn5_Ss?usp=sharing">Google Drive</a><br>
        <a href="https://1drv.ms/f/s!ArkW7KuUvNQykZUnrjCF-5OKcIJSow?e=beUjLy">OneDrive</a><br>
        <a href="https://protobetatest.com/download/lumia-emergency-files/">Proto Beta Test</a><br>
        <a href="https://github.com/fadilfadz01/lumia_firmware_download_bot/blob/main/devices.json">Device list from Fadil Fadz</a><br>
        <a href="https://discord.com/users/1229184983915298836">danyfar1404 on Discord</a><br>
        <a href="http://discord.com/users/888438421402550295">validites on Discord</a><br>
        <a href="http://discord.com/users/350363043852713984">mainnn on Discord</a><br><br>

        More are on the way!`
    ],
    "abt": [
        "About",
        () => `Welcome to Lumia FW! An alternative to LumiaFirmware made by Sucharek233.<br><br>
        
        The goal of this site is to provide a quick and easy way to download firmware for your Lumia device.<br><br>

        You can contact me on:<br>
        Reddit: <a href="https://reddit.com/u/Sucharek233">u/Sucharek233</a><br>
        Telegram: <a href="https://t.me/Sucharekk">@Sucharekk</a><br>
        Discord: <a href="https://discord.com/users/571780527728623626">suchare</a><br><br>
        
        You can also check this project out on <a href="https://github.com/Sucharek233/LumiaFW">GitHub</a>.<br>
        Database check (counter): ${supaCounter ?? "not here yet :) reopen About"}`
    ]
};

function showOverlay(type) {
    overlay.classList.add("shown");

    const info = text[type];
    overlayTitle.textContent = info[0];
    overlayText.innerHTML = typeof info[1] == 'function' ? info[1]() : info[1]; // what a line
}

function showOverlayCustom(title, message) {
    overlay.classList.add("shown");

    overlayTitle.textContent = title;
    overlayText.innerHTML = message;
}

function hideOverlay() {
    overlay.classList.remove("shown");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      hideOverlay();
      hideContributeOverlay();
      hideFeedbackOverlay();
    }
});