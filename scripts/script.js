// GENERATING GRID
const container = document.querySelector('.container');
let cells;

function generateGrid(size) {
    const gridWidth = getComputedStyle(container).width.slice(0,-2);
    const cellSize = gridWidth / size;
    
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.style.width = `${cellSize}px`;
        div.style.height = `${cellSize}px`;
        div.intensity = 0; // used for gradual mode
        container.appendChild(div);
    }
    
    cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mousedown', changeColor)); //changes color for currently clicked cell
    cells.forEach(cell => cell.addEventListener('mousedown', startSketching));//start event for hovering with mouse pressed down
}

function deleteGrid() {
    cells.forEach(cell => cell.remove());
}


//START SKETCHING

const colorPicker = document.getElementById('color-picker');

function startSketching() {
    // changeColor(); doesnt work - solved by adding second event listener while generating grid
    //this.style.backgroundColor = colorPicker.value; //change color of a clicked (initial) cell - works
    cells.forEach(cell => cell.addEventListener('mouseover', changeColor))  ;
    cells.forEach(cell => cell.addEventListener('mouseup', () => {
        cells.forEach(cell => cell.removeEventListener('mouseover', changeColor));
    }));     
}

function changeColor() {
    if (eraserBtn.classList.contains('activated')) {
        this.style.backgroundColor = '';
        this.intensity = 0;
    } else {
        if (gradualBtn.classList.contains('activated')) {
            if (this.intensity < 15) this.intensity++;
            this.style.backgroundColor =  `${colorPicker.value}${intensityArr[this.intensity]}`;
        } else if (rainbowBtn.classList.contains('activated')) {
            const r = Math.round(Math.random() * 255);
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            this.style.backgroundColor = `rgb(${r},${g},${b})`;
            console.log(`rgb(${r},${g},${b})`)     
        } else this.style.backgroundColor = colorPicker.value;
    }


}

//button for generating a new grid of selected density

// const gridSizeBtn = document.querySelector('.grid-size');
// gridSizeBtn.onclick = function() {
//     let size = 0;
//     while (size < 1 || size > 100) {
//         size = prompt("Please enter grid size between 1 and 100");
//         if (size === null) break;
//     }

//     deleteGrid();
//     generateGrid(size);
// }

//CHANGING GRID SIZE
const sizeSlider = document.getElementById('size-slider');
const sizeLabel = document.querySelector('label[for="size-slider"]');

function showGridSize() {
    sizeLabel.textContent = `Grid size: ${sizeSlider.value} x ${sizeSlider.value}`;
}

sizeSlider.addEventListener('input', showGridSize); //every alteration is registered and printed

sizeSlider.addEventListener('change', () => { //'change' only fires when final value is set (mouse up)
    deleteGrid();
    generateGrid(sizeSlider.value);
    showGridSize();
});

//GRADUAL MODE
const gradualBtn = document.querySelector('.gradual-mode');
const intensityArr = ['00','11','22','33','44','55','66','77','88','99','aa','bb','cc','dd','ee','ff'];

gradualBtn.onclick = () => {
    gradualBtn.classList.toggle('activated');
};

colorPicker.onchange = () => {
    cells.forEach(cell => cell.intensity = 0);
}

//RAINBOW MODE
const rainbowBtn = document.querySelector('.rainbow-mode');
rainbowBtn.addEventListener('click', () => {
    rainbowBtn.classList.toggle('activated');
});



//ERASER
const eraserBtn = document.querySelector('.eraser');
eraserBtn.addEventListener('click', () => {
    eraserBtn.classList.toggle('activated');
});

//CLEAR GRID
const clearGridBtn = document.querySelector('.clear-grid');
clearGridBtn.onclick = () => {
    cells.forEach(cell => cell.style.backgroundColor = '');
};




generateGrid(16); //initial grid
showGridSize();