let header = document.getElementById("header");

let overlay;
let overlayTitle;
let overlayText;

let infoDialogTitle;
let infoDialogText;

let linkDialogTitle;
let linkDialogText;
let linkDialogBtn;
let linkDialogBtnDontShowAgain;

let supabaseCounter;

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

    infoDialogTitle = document.getElementById("infoDialogTitle");
    infoDialogText = document.getElementById("infoDialogText");

    linkDialogTitle = document.getElementById("linkDialogTitle");
    linkDialogText = document.getElementById("linkDialogText");
    linkDialogBtn = document.getElementById("linkDialogBtn");
    linkDialogBtnDontShowAgain = document.getElementById("linkDialogBtnDontShowAgain");

    supabaseCounter = document.getElementById("supabaseCounter");

    contributeOverlay = document.getElementById("contributeOverlay");
    contributeInputs = document.getElementById("contributeInputs");
    contributeBtn = document.getElementById("contributeBtn");

    feedbackOverlay = document.getElementById("feedbackOverlay");
    feedbackInputs = document.getElementById("feedbackInputs");
    feedbackBtn = document.getElementById("feedbackBtn");

    title = document.getElementById("title");
}