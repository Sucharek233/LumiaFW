const text = {
    "cr": [
        "Credits",
        `Thanks to all of these sources for making this site possible!<br><br>
        
        <a href="https://t.me/lumia_rm">Lumia Firmware Telegram group</a><br>
        <a href="https://support.halabtech.com/index.php?a=downloads&b=folder&id=113527">HalabTech Support</a><br>
        <a href="https://firmwarefile.com/?s=lumia">Firmware File</a><br><br>
        
        More are on the way!`
    ],
    "ctrb": [
        "Contribute",
        `Do you want to help me expand the database of this project?<br><br>
        You can contact me on:<br>
        Reddit: <a href="https://reddit.com/u/Sucharek233">u/Sucharek233</a><br>
        Telegram: <a href="https://t.me/Sucharekk">@Sucharekk</a><br>
        Discord: <a href="https://discord.com/users/571780527728623626">suchare</a><br>
        Or create a GitHub issue <a href="https://github.com/Sucharek233/LumiaFW/issues">here</a>.<br><br>
        
        Your username will be credited.`
    ],
    "abt": [
        "About",
        `Welcome to Lumia FW! An alternative to LumiaFirmware made by Sucharek233.<br><br>
        
        The goal of this site is to provide a quick and easy way to download firmware for your Lumia device.<br><br>
        
        You can check this project out on <a href="https://github.com/Sucharek233/LumiaFW">GitHub</a>`
    ]
}

function showOverlay(type) {
    overlay.classList.add("shown");

    const info = text[type];
    overlayTitle.textContent = info[0];
    overlayText.innerHTML = info[1];
}

function hideOverlay() {
    overlay.classList.remove("shown");
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      hideOverlay();
    }
});