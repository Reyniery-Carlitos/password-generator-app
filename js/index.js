// DOM Elements
const formValues = document.getElementById('container-inputs')
const passGen = document.getElementById('passwordGen');    
const numberRange = document.getElementById('numberRange');
const lenghSelected = document.getElementById('lengthSelected');
const passComplex = document.getElementById('passComplex')

// Min password length 
let passLength = 4;

// Array of user's options selected 
const optionsChecked = []

// Password rules
const rules = {
    "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "lowercase": "abcdefghijklmnopqrstuvwxyz",
    "symbols": "`~!@#$%^&*()-_=+|[]{}'.:,;<>/?,",
    "numbers": "0123456789"
}

// Password complexity
const passComplexOptions = {
    1: "Weak",
    2: "Medium",
    3: "Semi-Strong",
    4: "Strong"
}

// Gets the length of the password selected by the user and updates the DOM element
const getLength = (e) => {
    passLength = numberRange.value;
    lenghSelected.innerHTML = passLength
}

// Returns a random number given the max value
const getRandomNumber = max => Math.floor(Math.random() * max);

// Manipulate form info
formValues.addEventListener("submit", (e) => {
    e.preventDefault();

    let passGenerated = ''

    e.target.options.forEach(({ value, checked }) => {
        checked && optionsChecked.push(value)
    })

    if (optionsChecked.length === 0) {
        return alert("Please select at least one option")
    }

    const optionChekedLength = optionsChecked.length
    for (let i = 0, len = passLength; i < len; i++) {
        const ruleSelected = rules[optionsChecked[getRandomNumber(optionChekedLength)]]
        passGenerated += ruleSelected.charAt(getRandomNumber(ruleSelected.length))
    }

    passComplex.innerHTML = passLength >= 8 ? passComplexOptions[optionChekedLength] : "Weak"
    passGen.innerHTML = passGenerated
    optionsChecked.length = 0
})

// Copy to clipboard
const copyToClipboard = () => {
    navigator.clipboard.writeText(passGen.innerHTML).then(() => {
        return passGen.innerHTML
    }).catch((err) => {
        return err
    })
}
