let header = document.getElementById("header");

let overlay;
let overlayTitle;
let overlayText;

let contributeOverlay;
let contributeInputs;
let contributeBtn;

let feedbackOverlay;
let feedbackInputs;
let feedbackBtn;

let title;

function loadGlobalElementDeclaration() {
    overlay = document.getElementById("infoOverlay");
    overlayTitle = document.getElementById("overlayTitle");
    overlayText = document.getElementById("overlayText");

    contributeOverlay = document.getElementById("contributeOverlay");
    contributeInputs = document.getElementById("contributeInputs");
    contributeBtn = document.getElementById("contributeBtn");

    feedbackOverlay = document.getElementById("feedbackOverlay");
    feedbackInputs = document.getElementById("feedbackInputs");
    feedbackBtn = document.getElementById("feedbackBtn");

    title = document.getElementById("title");
}