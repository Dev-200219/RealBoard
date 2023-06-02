let toolsToggleBtn = document.querySelector('.tools-toggle-container');
let toolsContainer = document.querySelector('.tools-container');
let pencilTool = document.querySelector('.pencil-tool');
let eraserTool = document.querySelector('.eraser-tool');
let stickyTool = document.querySelector('.sticky-tool');
let pencilToolsContainer = document.querySelector('.pencil-tools-container');
let eraserToolsContainer = document.querySelector('.eraser-tool-container');
let closeSymbol = document.querySelector('.close');
let openSymbol = document.querySelector('.open');

toolsToggleBtn.addEventListener('click', (e) => {
    let isVisible = toolsContainer.style.display;

    if(isVisible === 'none') {
        closeSymbol.style.display = 'block';
        toolsContainer.style.display = 'flex';
        openSymbol.style.display = 'none';
    }
    else {
        openSymbol.style.display = 'block';
        toolsContainer.style.display = 'none';
        closeSymbol.style.display = 'none';
        pencilToolsContainer.style.display = 'none';
        eraserToolsContainer.style.display = 'none';
    }
})

pencilTool.addEventListener('click', (e) => {
    let isVisible = pencilToolsContainer.style.display;

    if(isVisible === 'none') {
        pencilToolsContainer.style.display = 'block';
        eraserToolsContainer.style.display = 'none';
    }
    else {
        pencilToolsContainer.style.display = 'none';
    }
})

eraserTool.addEventListener('click', (e) => {
    let isVisible = eraserToolsContainer.style.display;

    if(isVisible === 'none') {
        pencilToolsContainer.style.display = 'none';
        eraserToolsContainer.style.display = 'block';
    }
    else {
        eraserToolsContainer.style.display = 'none';
    }
})

stickyTool.addEventListener('click', (e) => {
    let stickyElement = document.createElement('div');
    stickyElement.classList.add('sticky-container');
    stickyElement.setAttribute('draggable', 'true');

    stickyElement.innerHTML = `
        <div class="header-container">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="text-container">
            <textarea></textarea>
        </div>
    `

    document.querySelector('body').appendChild(stickyElement);
})
