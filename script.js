var defX = 16;
var defY = 16;
var defColorMode = "standard";

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

function resetGrid(){
    let n = defX*defY;
    var color;
    if(defColorMode == 'standard')
        color = 'white';
    else if(defColorMode == 'dark')
        color = 'black';
    else
        color = 'grey';
    for(let i = 0; i < n; i++){
        const container = document.querySelectorAll('.cell');
        container.forEach((cell) => {
            cell.style.backgroundColor = color;
        })
    }

}

function rainbowMode(){
    defColorMode = 'rainbow';
    initGrids(defX, defY, defColorMode);

}

function darkMode(){
    defColorMode = 'dark';
    resetGrid();


}

function changeBGColor(frag, colorMode){

    if(colorMode == "standard")
        frag.style.backgroundColor = 'yellow';
    else if(colorMode == "dark")
        frag.style.backgroundColor = 'lightblue';

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
        else
            darkMode();
    })
})