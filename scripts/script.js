// GENERATING GRID
const container = document.querySelector('.container');

function generateGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        container.appendChild(div);
    }
}

generateGrid(16);


//CHANGING COLORS
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('mousedown', startSketching));

//change color on hovered elements while the 
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

