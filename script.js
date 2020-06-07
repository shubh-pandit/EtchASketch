var defX = 16;
var defY = 16;
var defColorMode = "standard";
var rainbowPlaceholder = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var rainbowIndex = 0;
var buttonPlaceHolder = null;
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
    
    for(let i = 0; i < n; i++){
        const container = document.querySelector('.grid');
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
        const container = document.querySelectorAll('button');
        container.forEach((button) => {
            button.classList.remove('darkModeForButtons');
    })
    document.documentElement.style.setProperty('--border-color', '#a34040');
    }

    else if(colorMode == 'dark')
        color = 'black';
    else{
        color = 'grey';
        document.documentElement.style.setProperty('--border-color', '#7DF9FF');
    }
    for(let i = 0; i < n; i++){
        const container = document.querySelectorAll('.cell');
        container.forEach((cell) => {
            cell.style.backgroundColor = color;
        })
    }
    defColorMode = colorMode;

}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRainbowColor(){
    rainbowIndex = (rainbowIndex+1)%6;
    return rainbowPlaceholder[rainbowIndex];
}


function rainbowMode(){
    defColorMode = 'rainbow';
    resetGrid(defColorMode);
    
}

function darkMode(){
    defColorMode = 'dark';
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



function changeBGColor(frag, colorMode){

    if(colorMode == "standard")
        frag.style.backgroundColor = '#3b1812';
    else if(colorMode == "dark")
        frag.style.backgroundColor = 'lightblue';
    else if(colorMode == "random")
        frag.style.backgroundColor = getRandomColor();
    else
        frag.style.backgroundColor = getRainbowColor();
}

initGrids(16,16, "standard");

const cell = document.querySelectorAll('.cell');
cell.forEach((frag) => {
    frag.addEventListener('mouseover', (e) => {
        changeBGColor(frag, defColorMode);
        
    })
})

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
        else
            randomMode();
        
        buttonPlaceHolder = button;

    })
})