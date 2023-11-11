const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#upper");
const lowercaseCheck=document.querySelector("#lower");
const numbersCheck=document.querySelector("#nums");
const symbolsCheck=document.querySelector("#syms");

const indicator=document.querySelector(".indicator");
const generateBtn=document.querySelector(".create-pass");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// Default case
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
// set circle color to grey
setIndicator("#ccc");



// Set password's length to show on UI
function handleSlider(){

    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";  
}

function setIndicator(color){
    indicator.style.backgroundColor=color;

    // Homework ---> shadow
    // if(color=="#0f0"){
    //     indicator.style.boxShadow= "0px 0px 10px 2px #0f0";
    // }
    // else if(color=="#ff0"){
    //     indicator.style.boxShadow= "0px 0px 10px 2px #ff0";
    // }
    // else if(color=="#f00"){
    //     indicator.style.boxShadow= "0px 0px 10px 2px #f00";
    // }
    // OR
    indicator.style.boxShadow= `0px 0px 10px 2px ${color}`;
    
    

}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90));
}

function generateSymbol(){
    return symbols[getRandomInteger(0,symbols.length)];
    // return symbols.charAt(getRandomInteger(0,symbols.length));
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){

    if(password.length==0) return;

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";

    }
    catch(e){
        copyMsg.innerText="Failed";
    }

    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}


// OR YOU CAN MAP ONCLICK FUNCTION IN THE HTML DOCUMENT WITH THE COPYCONTENT() FUNCTION
// copyBtn.addEventListener('click',()=>{
//     if(passwordDisplay.value){
//         copyContent();
//     }
// })


inputSlider.addEventListener('input',(e)=> {
    passwordLength=e.target.value;
    handleSlider();
})

function handleCheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    // special case
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
})


function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }

    let str="";
    array.forEach((ch)=>(str+=ch))
    return str;
}

generateBtn.addEventListener('click',()=>{

    if(checkCount<=0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";

    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    // while(password.length!=passwordLength){
    //     let num=getRandomInteger(0,4);

    //     switch(num){
    //         case 0:password+=generateUpperCase();
    //                 break;
    //         case 1:password+=generateLowerCase();
    //                 break;
    //         case 2:password+=generateRandomNumber();
    //                 break;
    //         case 3:password+=generateSymbol();
    //                 break;
    //         default:password+=generateSymbol();
    //     }
    // }

    let funcArr=[];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    while(password.length!=passwordLength){
        let rndIndx=getRandomInteger(0,funcArr.length);
        password+=funcArr[rndIndx]();

    }

    password=shufflePassword(Array.from(password));

    passwordDisplay.value=password;

    calcStrength();


    
     
})







