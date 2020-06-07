var defX = 16;
var defY = 16;
var defColorMode = "standard";
var rainbowPlaceholder = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var rainbowIndex = 0;
function initGrids(x, y, colorMode){
    
    let n = x*y;
    defX = x;
    defY = y;
    var color;
    if(colorMode == 'standard')
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
    if(colorMode == 'standard')
        color = 'white';
    else if(colorMode == 'dark')
        color = 'black';
    else
        color = 'grey';
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
}

function randomMode(){
    defColorMode = 'random';
    resetGrid(defColorMode);

}



function changeBGColor(frag, colorMode){

    if(colorMode == "standard")
        frag.style.backgroundColor = 'yellow';
    else if(colorMode == "dark")
        frag.style.backgroundColor = 'lightblue';
    else if(colorMode == "random")
        frag.style.backgroundColor = getRandomColor();
    else
        frag.style.backgroundColor = getRainbowColor();
}

initGrids(16,16);

const cell = document.querySelectorAll('.cell');
cell.forEach((frag) => {
    frag.addEventListener('mouseover', (e) => {
        changeBGColor(frag, defColorMode);
        
    })
})

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log('HOVERED');
        if(button.value == 'reset')
            resetGrid();
        else if(button.value == 'rainbow')
            rainbowMode();
        else if(button.value =='dark')
            darkMode();
        else
            randomMode();

    })
})