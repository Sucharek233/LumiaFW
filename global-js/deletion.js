function removeByClassName(className) {
    let elements = document.getElementsByClassName(className);
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeElementChildren(element) {
    let elements = element.children;
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}