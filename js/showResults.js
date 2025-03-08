function removeByClassName(className) {
    let elements = document.getElementsByClassName(className);
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function showResults(model, rms) {
    title.innerText = `Showing results for ${model}`;
    removeByClassName("card");

    rms.forEach(rm => {
        const infos = getRM(rm);

        infos.forEach(info => {
            const card = document.createElement("div");
            card.className = "card";
    
            const infoElement = document.createElement("p");
            infoElement.innerHTML = `
                <b>Hardware model:</b> ${rm}<br>
                <b>Country code:</b> ${info[2]}<br>
                <b>Country info:</b> ${info[3]}<br>
                <b>Firmware:</b> ${info[4]}<br>
                <b>File name:</b> ${info[5]}<br>
                <b>Link:</b> <a href="${info[6]}">${info[6]}</a>
            `
    
            card.append(infoElement);
            cards.append(card);
            console.log(info);
        });
    });
}