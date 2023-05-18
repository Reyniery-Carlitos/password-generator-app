const formValues = document.getElementById('container-inputs')
const passGen = document.getElementById('passwordGen');    
const numberRange = document.getElementById('numberRange');
const lenghSelected = document.getElementById('lengthSelected');
const passComplex = document.getElementById('passComplex')
let lengthPass = 4;

const optionsChecked = []
const items = {
    "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "lowercase": "abcdefghijklmnopqrstuvwxyz",
    "symbols": "`~!@#$%^&*()-_=+|[]{}'.:,;<>/?,",
    "numbers": "0123456789"
}

const passComplexOptions = {
    1: "Weak",
    2: "Medium",
    3: "Semi-Strong",
    4: "Strong"
}

const getLength = (e) => {
    lengthPass = numberRange.value;
    lenghSelected.innerHTML = lengthPass
}

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
    for (let i = 0, len = lengthPass; i < len; i++) {
        const itemSelected = items[optionsChecked[Math.floor(Math.random() * optionChekedLength)]]
        passGenerated += itemSelected.charAt(Math.floor(Math.random() * itemSelected.length))
    }

    passComplex.innerHTML = lengthPass >= 8 ? passComplexOptions[optionChekedLength] : "Weak"
    passGen.innerHTML = passGenerated
    optionsChecked.length = 0
})

const copyToClipboard = () => {
    navigator.clipboard.writeText(passGen.innerHTML).then(() => {
        return passGen.innerHTML
    }).catch((err) => {
        return err
    })
}
