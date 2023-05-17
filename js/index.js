let lengthPass = 4;

const passGen = document.getElementById('passwordGen');
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
    const numberRange = document.getElementById('numberRange')
    const lenghSelected = document.getElementById('lengthSelected')
    lengthPass = numberRange.value;
    lenghSelected.innerHTML = lengthPass
}

const formValues = document.getElementById('container-inputs')

formValues.addEventListener("submit", (e) => {
    e.preventDefault();

    const optionsChecked = []
    let passGenerated = ''
    const passComplex = document.getElementById('passComplex')

    e.target.options.forEach(({ value, checked }) => {
        checked && optionsChecked.push(value)
    })

    if (optionsChecked.length === 0) {
        return alert("Please select at least one option")
    }

    for (let i = 0; i < lengthPass; i++) {
        const itemSelected = items[optionsChecked[Math.floor(Math.random() * optionsChecked.length)]]
        passGenerated += itemSelected.charAt(Math.floor(Math.random() * itemSelected.length))
    }

    passComplex.innerHTML = lengthPass >= 8 ? passComplexOptions[optionsChecked.length] : "Weak"
    passGen.innerHTML = passGenerated
})

const copyToClipboard = () => {
    navigator.clipboard.writeText(passGen.innerHTML).then(() => {
        return passGen.innerHTML
    }).catch((err) => {
        return err
    })
}
