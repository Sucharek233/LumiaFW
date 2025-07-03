let lastToolOpened;
let lastToolBtn;

function openTool(tool) {
    sidebar.classList.remove("open");
    const currTool = document.getElementById(tool);
    const currToolBtn = document.getElementById(`${tool}-btn`);
    if (lastToolOpened) {
        if (lastToolOpened == currTool) {return;}
        lastToolOpened.style.display = "none";
        lastToolBtn.classList.remove("selected");

    }

    title.textContent = currToolBtn.textContent;
    currTool.style.display = "flex";
    currToolBtn.classList.add("selected");

    lastToolOpened = currTool;
    lastToolBtn = currToolBtn;
}