function resize() {
    const newHeight = window.innerHeight - cards.getBoundingClientRect().y;
    const newWidth = window.innerWidth - cards.getBoundingClientRect().x;
    cards.style.maxHeight = newHeight + "px";
    cards.style.maxWidth = newWidth + "px";
}

window.addEventListener('resize', resize, false);