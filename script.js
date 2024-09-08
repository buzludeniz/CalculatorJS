const calculateScreen = document.querySelector('.calculate')
const resultScreen = document.querySelector('.result')

// variable to store the calculation value
let calculateValue = ''

const operators = ['%','/','*','+','-']

//Function called when a number is pressed
function tapNum(numValue){
    if(calculateValue == '' && numValue == '.'){
        return;
    }

    if(calculateValue.at(-1) == '.' && numValue == "."){
        return;
    }

    addCalculateScreen(numValue)
}
//Function called when am operator is pressed
function tapOperator(operatorValue){

    if(calculateValue == '') return;

    if(operators.some(operator => calculateValue.at(-1) == operator)){
        return;
    }


    if(resultScreen.textContent!= '' && resultScreen.textContent != 'Error'){
        calculateValue = resultScreen.textContent
        resultScreen.textContent = ''
    }

    addCalculateScreen(operatorValue)
}

function tapResult(){
    try{
        resultScreen.textContent = eval(calculateValue)
    }
    catch(e){
        resultScreen.textContent = 'Error'
    }
}
function tapClear(){
    calculateValue = ''

    calculateScreen.textContent = calculateValue
    resultScreen.textContent = ''
}

function tapDel(){
    calculateValue = calculateValue.slice(0,-1)
    calculateScreen.textContent = calculateValue
    resultScreen.textContent = ''
}


//Function to add a value to the calculation screen
function addCalculateScreen(value){
    // Append the value to the calculation string
    calculateValue += value
    //Update the calculation screen 
    calculateScreen.textContent = calculateValue
}

