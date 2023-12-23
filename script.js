const divBoxesSize = () => {
    const rangeSlider = document.querySelector('#range-slider');
    const mainContainer = document.querySelector('#main-container');
    const boxContainer = document.querySelector('#box-container');

    boxContainer.innerHTML = "";

    for (let i = 0; i < rangeSlider.value; i++) {
        const box = document.createElement("div");
        box.className = "box";
        boxContainer.appendChild(box);
    }
}