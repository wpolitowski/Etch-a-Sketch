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
        container.appendChild(div);
    }
    
    cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mousedown', startSketching));
}

function deleteGrid() {
    cells.forEach(cell => cell.remove());
}


//CHANGING COLORS

function startSketching() {
    this.style.backgroundColor = '#ccc'; //change color of a clicked (initial) cell
    cells.forEach(cell => cell.addEventListener('mouseover', changeColor));
    cells.forEach(cell => cell.addEventListener('mouseup', () => {
        cells.forEach(cell => cell.removeEventListener('mouseover', changeColor));
    }));     
}

function changeColor() {
    this.style.backgroundColor = '#ccc'
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



generateGrid(16); //initial grid
showGridSize();