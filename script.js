const rangeSlider = document.querySelector('#range-slider');
const boxContainer = document.querySelector('#box-container');
const colorMode = document.querySelector('#color-mode');
const rainbowMode = document.querySelector('#rainbow-mode');
const eraseMode = document.querySelector('#erase-mode');
const clearBtn = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');

// Create a div element with the given size in pixels and return it
const createDiv = (size) => {
    const div = document.createElement('div');
    div.classList.add('box');
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;

    // Prevent dragging of divs
    div.addEventListener('dragstart', function (event) {
        event.preventDefault();
    });

    return div;
};

// Create a grid of divs with the given size in pixels
const createGrid = (gridSize) => {
    const fragment = document.createDocumentFragment();
    const cellSize = boxContainer.clientWidth / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            fragment.appendChild(createDiv(cellSize));
        }
    }

    boxContainer.innerHTML = '';
    boxContainer.appendChild(fragment);
};

// Create a grid with the size of the range slider
const createGridSize = () => {
    let gridSize = parseInt(rangeSlider.value);
    gridSize = Math.min(Math.max(gridSize, 2), 64);
    createGrid(gridSize);
};

// Apply a given callback to each box based on mouse events
const applyMouseEvent = (callback) => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            callback(box);
        });
        box.addEventListener('mousedown', () => {
            callback(box);
        });
        box.addEventListener('mouseover', (event) => {
            if (event.buttons === 1) {
                callback(box);
            }
        });
    });
};

const changeColorMode = () => {
    const selectedColor = colorPicker.value;
    const paintBox = (box) => {
        box.style.backgroundColor = selectedColor;
    };
    applyMouseEvent(paintBox);
};

const changeRainbowMode = () => {
    const paintBox = (box) => {
        box.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    };
    applyMouseEvent(paintBox);
};

const changeEraseMode = () => {
    const paintBox = (box) => {
        box.style.backgroundColor = 'white';
    };
    applyMouseEvent(paintBox);
};

const clearGrid = () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.backgroundColor = 'white';
    });
};

const randomGrid = () => {
    const paintBox = (box) => {
        box.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    };
    applyMouseEvent(paintBox);
};

// makes sure only one button is active at a time
document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.btn').forEach((otherBtn) => {
            if (otherBtn !== this && otherBtn.id !== 'clear') {
                otherBtn.classList.remove('active');
            }
        });
        this.classList.toggle('active');
    });
});

colorPicker.addEventListener('input', changeColorMode);
colorMode.addEventListener('click', changeColorMode);
rainbowMode.addEventListener('click', changeRainbowMode);
eraseMode.addEventListener('click', changeEraseMode);
clearBtn.addEventListener('click', clearGrid);
rangeSlider.addEventListener('input', createGridSize);

createGridSize();