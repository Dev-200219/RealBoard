let canvas = document.querySelector('canvas');
let pencilColors = document.querySelectorAll('.pencil-color');
let pencilWidth = document.querySelector('.pencil-width-container input');
let eraserWidth = document.querySelector('.eraser-width-container input');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
 
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;

let mouseDown = false;

//for drawing on canvas
canvas.addEventListener('mousedown', (e) => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    mouseDown = true;
})

canvas.addEventListener('mousemove', (e) => {
    if(!mouseDown) return;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
})

canvas.addEventListener('mouseup', (e) => {
    mouseDown = false;
    ctx.closePath();
})

//for changing color
pencilColors.forEach((pencilColor) => {
        pencilColor.addEventListener('click', (e) => {
        ctx.strokeStyle = pencilColor.classList[0];
    })
})

//for changing pencil width
pencilWidth.addEventListener('change', (e) => {
    ctx.lineWidth = pencilWidth.value;
})

eraserWidth.addEventListener('change', (e) => {
    ctx.lineWidth = eraserWidth.value;
})

eraserTool.addEventListener('click', (e) => {
    ctx.lineWidth = eraserWidth.value;
    ctx.strokeStyle = 'white';
})

pencilTool.addEventListener('click', (e) => {
    ctx.lineWidth = pencilWidth.value;
    ctx.strokeStyle = 'black';
    document.querySelector('canvas').classList.remove('active');
})