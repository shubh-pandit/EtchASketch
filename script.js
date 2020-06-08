var defX = 16;
var defY = 16;
var defColorMode = "standard";
var rainbowPlaceholder = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var rainbowIndex = 0;
var buttonPlaceHolder = null;
var currentBG = 'white';
var clickAndDragFlag = false;
var eraseFlag = false;
var clickAndDragPress = false;
function initGrids(x, y, colorMode){
    
    let n = x*y;
    defX = x;
    defY = y;
    var color;
    if(colorMode == 'standard' || colorMode == 'random')
        color = 'white';
    else if(colorMode == 'dark')
        color = 'black';
    else
        color = 'grey';

    const container = document.querySelector('.grid');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    for(let i = 0; i < n; i++){
        let cell = document.createElement("div");
        cell.style.backgroundColor = color;
        container.appendChild(cell).classList.add('cell');




    }
    document.documentElement.style.setProperty('--column-config', 'repeat(' + y.toString() + ', 1fr)');
}

function resetGrid(colorMode = "standard"){
    let n = defX*defY;
    var color;
    if(colorMode == 'standard'|| colorMode == 'random'){
        color = 'white';
        currentBG = 'white';
        const container = document.querySelectorAll('button');
        container.forEach((button) => {
            button.classList.remove('darkModeForButtons');
    })
    document.documentElement.style.setProperty('--border-color', '#a34040');
    }

    else if(colorMode == 'dark'){
        color = 'black';
        currentBG = 'black';
    }
    else{
        currentBG = 'grey';
        color = 'grey';
        const container = document.querySelectorAll('button');
        container.forEach((button) => {
            button.classList.remove('darkModeForButtons');
        })
        document.documentElement.style.setProperty('--border-color', '#7DF9FF');
    }
    for(let i = 0; i < n; i++){
        const container = document.querySelectorAll('.cell');
        container.forEach((cell) => {
            cell.style.backgroundColor = color;
        })
    }
    
    defColorMode = colorMode;
    changeBGImg();

}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBGImg(){
    
    if(defColorMode == 'standard'||defColorMode == 'random'){
        document.documentElement.style.setProperty('--title-color', '#731300');
        document.documentElement.style.setProperty('--bg-url', 'url("resources//standardBG.jpg")');
    }
    else if(defColorMode == 'dark'){
        document.documentElement.style.setProperty('--title-color', '#448285');
        document.documentElement.style.setProperty('--bg-url', 'url("resources//' + defColorMode + 'BG.jpg")');
    }
    else if(defColorMode == 'rainbow'){
        document.documentElement.style.setProperty('--title-color', '#f6fa00');
        document.documentElement.style.setProperty('--bg-url', 'url("resources//' + defColorMode + 'BG.jpg")');
    }
    
}

function getRainbowColor(){
    rainbowIndex = (rainbowIndex+1)%6;
    return rainbowPlaceholder[rainbowIndex];
}


function rainbowMode(){
    defColorMode = 'rainbow';
    currentBG = 'grey';
    resetGrid(defColorMode);
    
    
}

function darkMode(){
    defColorMode = 'dark';
    currentBG = 'black';
    resetGrid(defColorMode);
    const container = document.querySelectorAll('button');
    container.forEach((button) => {
        button.classList.add('darkModeForButtons');
    })
    document.documentElement.style.setProperty('--border-color', '#474545');
    
}

function randomMode(){
    defColorMode = 'random';
    resetGrid(defColorMode);
    

}

function eraseMode(){
    const container = document.querySelector('.eraserButton');
    if(eraseFlag){
        container.textContent = 'Eraser : Off';
        eraseFlag = false;
    }

    else{
        container.textContent = 'Eraser : On';
        eraseFlag = true;
    
    }

}



function clickDragMode(){
    const container = document.querySelector('.clickAndDragButton');
    if(clickAndDragFlag){
        clickAndDragFlag = false;
        container.textContent = 'Hover Mode';

    }

    else{
        clickAndDragFlag = true;
        container.textContent = 'Click and Drag Mode';
    
    }
    initDraw(false);
    
}
function modifyGridSize(){
    dimension = parseInt(prompt('Enter new Grid Size (1-50)'));
    if(dimension < 1 || dimension > 50 || isNaN(dimension)){
        alert('Incorrect input, using default size (16)');
        dimension = 16;
    }
    initGrids(dimension, dimension, defColorMode);
    initDraw(true);

}

function clickAndDragDraw(cell, press){

    if(press == 1){
        clickAndDragPress = true;
        changeBGColor(cell, defColorMode);
    }
    else if(press == 3){
        clickAndDragPress = false;

    }
    else{
        if(clickAndDragPress){
            changeBGColor(cell, defColorMode);
        }
    }

}

function saveSketch(){
    var t = document.getElementById('canvas');
    var c = t.getContext('2d');
    const container = document.getElementsByClassName('cell');
    var iter = 0;
    const w = t.width/defX;
    const h = t.height/defY;

    for(let i = 0; i < defX; i++){
        for(let j = 0; j < defY; j++){
            c.fillStyle = container[iter].style.backgroundColor;
            let x = j*700/defX;
            let y = i*600/defY;
            c.fillRect(x,y,w,h);
            iter++;
        }
    }
    window.open(document.getElementById('canvas').toDataURL());

}

function initDraw(initial){
    
    
    if(clickAndDragFlag){
        var old_element = document.getElementsByClassName('grid');
        for(var i = 0; i < old_element.length; i++) {
            var newElement = old_element[i].cloneNode(true);
            old_element[i].parentNode.replaceChild(newElement, old_element[i]);

        }
        
        
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {

            cell.addEventListener('mouseover', (e) => {
                clickAndDragDraw(cell, 2);

            });

            cell.addEventListener('mousedown', (e) => {
                clickAndDragDraw(cell, 1);
            
                
            });
            cell.addEventListener('mouseup', (e) => {
                clickAndDragDraw(cell, 3);
            })

            

        })


    }
    else{
        if(!initial){
            var old_element = document.getElementsByClassName('grid');
            for(var i = 0; i < old_element.length; i++) {
                var newElement = old_element[i].cloneNode(true);
                old_element[i].parentNode.replaceChild(newElement, old_element[i]);
            }
        }
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {

            cell.addEventListener('mouseover', (e) => {

                changeBGColor(cell, defColorMode);
            })
        })
    }
}


function changeBGColor(frag, colorMode){    
    if(eraseFlag){
        frag.style.backgroundColor = currentBG;
    }
    else{
        if(colorMode == "standard")
            frag.style.backgroundColor = '#3b1812';
        else if(colorMode == "dark")
            frag.style.backgroundColor = 'lightblue';
        else if(colorMode == "random")
            frag.style.backgroundColor = getRandomColor();
        else if(colorMode == 'rainbow')
            frag.style.backgroundColor = getRainbowColor();
    }
}

initGrids(16,16, "standard");
clickDragMode();

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(buttonPlaceHolder)
            buttonPlaceHolder.classList.remove('sizeIncrease');
        button.classList.add('sizeIncrease');
        if(button.value == 'reset')
            resetGrid();
        else if(button.value == 'rainbow')
            rainbowMode();
        else if(button.value =='dark')
            darkMode();
        else if(button.value == 'random')
            randomMode();
        else if(button.value == 'eraser')
            eraseMode();
        else if(button.value == 'clickdrag')
            clickDragMode();
        else if(button.value == 'gridsize')
            modifyGridSize();
        else if(button.value == 'save')
            saveSketch();
            
        
        buttonPlaceHolder = button;

    })
})  