const rangeSlider = document.querySelector('#range-slider');
const boxContainer = document.querySelector('#box-container');

function createDiv(size) {
    const div = document.createElement('div');
    div.classList.add('box');
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;

    return div;
}

function createGrid(gridSize) {
    const fragment = document.createDocumentFragment(); // Create a fragment to hold the elements

    const cellSize = boxContainer.clientWidth / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            fragment.appendChild(createDiv(cellSize));
        }
    }

    boxContainer.innerHTML = ''; // Clear the container
    boxContainer.appendChild(fragment); // Append all elements at once
}

function createGridSize() {
    let gridSize = parseInt(rangeSlider.value);
    if (gridSize < 2) {
        gridSize = 2;
    } else if (gridSize > 64) {
        gridSize = 64;
    }
    createGrid(gridSize);
}

rangeSlider.addEventListener('input', createGridSize);
createGridSize(); // Initial grid creation
