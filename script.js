let colorSelectBtn = document.getElementById('colorSelectBtn');
let brushBtn = document.getElementById('brushBtn');
let penBtn = document.getElementById('penBtn');
let lineBtn = document.getElementById('lineBtn');
let rectBtn = document.getElementById('rectBtn');
let circleBtn = document.getElementById('circleBtn');
let eraseBtn = document.getElementById('eraseBtn');
let canvas = document.getElementById('canvas');

let currentPenMode = '';
let drawingStates = false;
let startPointX = 0;
let startPointY = 0;
let endPointX = 0;
let endPointY = 0;
let currentColor = '#000000'
let fillMode = false;

brushBtn.addEventListener('click', ()=>{fillMode = true});
penBtn.addEventListener('click', ()=>{currentPenMode = 'pen'; fillMode = false});
lineBtn.addEventListener('click', ()=>{currentPenMode = 'line'});
rectBtn.addEventListener('click', ()=>{currentPenMode = 'rect'});
circleBtn.addEventListener('click', ()=>{currentPenMode = 'circle'});
eraseBtn.addEventListener('click', ()=>{eraseAllBoard();});

canvas.addEventListener('mousedown',detectStartPoint);
canvas.addEventListener('mouseup',startDrawingMode);
canvas.addEventListener('mousemove', freeLineDrawCheck);

function freeLineDrawCheck(e){
    if(currentPenMode == 'pen'){
        canvas.addEventListener('mouseup',stopDrawing);
        startDrawingMode(e);
    }
}

function detectStartPoint(e){
    detectColor();
    if(currentPenMode){
        drawingStates = true;
        currentDraw = false;
        startPointX = e.pageX - e.currentTarget.offsetLeft;
        startPointY = e.pageY - e.currentTarget.offsetTop;
    }
}

function detectColor(){
    currentColor = colorSelectBtn.value;
}

function startDrawingMode(e){
    if(drawingStates == true){
        endPointX = e.pageX - e.currentTarget.offsetLeft;
        endPointY = e.pageY - e.currentTarget.offsetTop;
        detectCurrentMode();
    }
}

function detectCurrentMode(){
    switch (currentPenMode){
        case 'pen':
            createFreeLine(endPointX, endPointY);
            break;
        case 'line':
            createStreatLine(startPointX, startPointY, endPointX, endPointY);
            break;
        case 'rect':
            createRectangle(startPointX, startPointY, endPointX, endPointY);
            break;
        case 'circle':
            createCircle(startPointX, startPointY, endPointX, endPointY);
            break;
    }
}

function stopDrawing(){
    if(drawingStates == true){
        startPointX = 0;
        startPointY = 0;
        endPointX = 0;
        endPointY = 0;
        drawingStates = false;
    }
}

function createFreeLine(x2, y2){
    const ctx = canvas.getContext('2d');
    for(let i=0; i<100; i++){
        ctx.fillStyle = `${currentColor}`
        ctx.fillRect(x2, y2, 3, 3);
    }
}

function createStreatLine(x1, y1, x2, y2){
    const ctx = canvas.getContext('2d');    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${currentColor}`
    ctx.stroke();

    stopDrawing();
}

function createRectangle(x1, y1, x2, y2){
    const ctx = canvas.getContext('2d');    
    ctx.beginPath();
    ctx.rect(x1, y1, (x2-x1), (y2-y1));
    if(fillMode){
        ctx.fillStyle = `${currentColor}`;
        ctx.fill();
    }else{
        ctx.strokeStyle = `${currentColor}`;
        ctx.stroke();
    }
    stopDrawing();
}

function createCircle(x1, y1, x2, y2){
    if((x2-x1) < 0){
        newX2 = Math.abs(x2-x1)
    }else{
        newX2 = x2-x1;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x1, y1, newX2, 0, 2 * Math.PI);
    if(fillMode){
        ctx.fillStyle = `${currentColor}`;
        ctx.fill();
    }else{
        ctx.strokeStyle = `${currentColor}`;
        ctx.stroke();
    }
    stopDrawing();
}

function eraseAllBoard(){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}