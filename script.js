let toolsToggleBtn = document.querySelector('.tools-toggle-container');
let toolsContainer = document.querySelector('.tools-container');
let pencilTool = document.querySelector('.pencil-tool');
let eraserTool = document.querySelector('.eraser-tool');
let cursorTool = document.querySelector('.cursor-tool');
let stickyTool = document.querySelector('.sticky-tool');
let undoTool = document.querySelector('.undo-tool');
let redoTool = document.querySelector('.redo-tool');
let pencilToolsContainer = document.querySelector('.pencil-tools-container');
let eraserToolsContainer = document.querySelector('.eraser-tool-container');
let uploadBtn = document.querySelector('.upload-tool');
let downloadBtn = document.querySelector('.download-tool');
let closeSymbol = document.querySelector('.close');
let openSymbol = document.querySelector('.open');
let isCursorActive = true;
let isPencilActive = false;
let isEraserActive = false;

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

stickyTool.addEventListener('click', (e) => {
    let stickyElement = document.createElement('div');
    stickyElement.classList.add('sticky-container');

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
    removeAndMinimize(stickyElement);

    stickyElement.onmousedown = function(event) {
        dragAndDrop(stickyElement, event);
    };  
      
    stickyElement.ondragstart = function() {
        return false;
    };
})

uploadBtn.addEventListener('click', (e) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.addEventListener('change', (e) => {
        let image = input.files[0];
        let imgURL = URL.createObjectURL(image);

        let stickyElement = document.createElement('div');
        stickyElement.classList.add('sticky-container');

        stickyElement.innerHTML = `
            <div class="header-container">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="text-container">
                <img src = ${imgURL} />
            </div>
        `

        document.querySelector('body').appendChild(stickyElement);
        removeAndMinimize(stickyElement);

        stickyElement.onmousedown = function(event) {
            dragAndDrop(stickyElement, event);
        };  
        
        stickyElement.ondragstart = function() {
            return false;
        };
    })
})

//Source : https://javascript.info/mouse-drag-and-drop
function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

function removeAndMinimize(element) {
    let removeStickyBtn = element.querySelector('.remove');
    let minimizeStickyBtn = element.querySelector('.minimize');
    let textCont = element.querySelector('.text-container');
    
    removeStickyBtn.addEventListener('click', (e) => {
        element.remove();
    })
    
    minimizeStickyBtn.addEventListener('click', (e) => {
        let isVisible = textCont.style.display;

        if(isVisible === 'none') {
            textCont.style.display = 'block';
        }
        else {
            textCont.style.display = 'none';
        }
    })
}