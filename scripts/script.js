const container = document.querySelector('.container');

function generateGrid(size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        console.log(div)
        div.classList.add('square');
        container.appendChild(div);
    }
}

generateGrid(10)