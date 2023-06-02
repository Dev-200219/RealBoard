let canvas = document.querySelector('canvas');
let pencilColors = document.querySelectorAll('.pencil-color');
let pencilWidth = document.querySelector('.pencil-width-container input');
let eraserWidth = document.querySelector('.eraser-width-container input');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
 
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let stateStack = [];
stateStack = [canvas.toDataURL()];
let stateIdx = 0;

let mouseDown = false;

//for drawing on canvas
canvas.addEventListener('mousedown', (e) => {
    if(!isEraserActive && !isPencilActive) return;

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    mouseDown = true;
})

canvas.addEventListener('mousemove', (e) => {
    if(!mouseDown) return;
    if(!isEraserActive && !isPencilActive) return;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
})

canvas.addEventListener('mouseup', (e) => {
    if(!isEraserActive && !isPencilActive) return;
    mouseDown = false;
    ctx.closePath();
    stateStack[++stateIdx] = canvas.toDataURL();
    console.log(stateStack);
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
    let isVisible = eraserToolsContainer.style.display;

    if(isVisible === 'none' || !isVisible) {
        pencilToolsContainer.style.display = 'none';
        eraserToolsContainer.style.display = 'block';
    }
    else {
        eraserToolsContainer.style.display = 'none';
    }

    isCursorActive = false;
    isEraserActive = true;
    isPencilActive = false;

    canvas.classList.remove('pencil-active')
    canvas.classList.add('eraser-active')

    ctx.lineWidth = eraserWidth.value;
    ctx.strokeStyle = 'white';
})

pencilTool.addEventListener('click', (e) => {
    let isVisible = pencilToolsContainer.style.display;

    if(isVisible === 'none' || !isVisible) {
        pencilToolsContainer.style.display = 'block';
        eraserToolsContainer.style.display = 'none';
    }
    else {
        pencilToolsContainer.style.display = 'none';
    }

    isCursorActive = false;
    isEraserActive = false;
    isPencilActive = true;

    canvas.classList.add('pencil-active')
    canvas.classList.remove('eraser-active')

    ctx.lineWidth = pencilWidth.value;
    ctx.strokeStyle = 'black';
})

cursorTool.addEventListener('click', (e) => {
    isCursorActive = true;
    isEraserActive = false;
    isPencilActive = false;
    eraserToolsContainer.style.display = 'none';
    pencilToolsContainer.style.display = 'none';
    canvas.classList.remove('eraser-active');
    canvas.classList.remove('pencil-active');
})

downloadBtn.addEventListener('click', (e) => {
    let boardURL = canvas.toDataURL();

    let a = document.createElement('a');
    a.href = boardURL;
    a.download = 'board.jpg';
    a.click();
})

undoTool.addEventListener('click', (e) => {
    if(stateIdx == 0) return;

    let prevState = stateStack[stateIdx - 1];
    --stateIdx;

    let image = new Image();
    image.src = prevState;
    image.onload = (e) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    }
})

redoTool.addEventListener('click', (e) => {
    if(stateIdx == stateStack.length - 1) return;

    let nextState = stateStack[stateIdx + 1];
    ++stateIdx;

    let image = new Image();
    image.src = nextState;
    image.onload = (e) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
})