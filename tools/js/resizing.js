function resize() {
    const newHeight = window.innerHeight - rmResults.getBoundingClientRect().y;
    const newWidth = window.innerWidth - rmResults.getBoundingClientRect().x;
    rmResults.style.maxHeight = newHeight + "px";
    rmResults.style.maxWidth = newWidth + "px";
}

window.addEventListener('resize', resize, false);