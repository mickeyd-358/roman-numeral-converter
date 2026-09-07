const form = document.getElementById('converter-form');
const romanOutput = document.getElementById('roman-numeral');

const intToRoman = document.getElementById('integer-to-roman');
const romanToInt = document.getElementById('roman-to-integer');
const toggleSwitch = document.getElementById('toggleCheckbox');
const modeTitle = document.getElementById('mode-title');

const romanDict = {
    "M": 1000,
    "CM": 900,
    "D": 500,
    "CD": 400,
    "C": 100,
    "XC": 90,
    "L": 50,
    "XL": 40,
    "X": 10,
    "IX": 9,
    "V": 5,
    "IV": 4,
    "I": 1
};

// ROMAN → INTEGER
function convertToInteger(roman) {
    // TODO: write your Roman → integer algorithm here
}


// -------------------------
// ERROR MESSAGE
// -------------------------

function showError(message) {
    const errorBox = document.getElementById('error-message-box');
    const errorMessage = document.getElementById('error-message');
    const progressBar = document.getElementById('progress-bar');
    const errorProgress = document.getElementById('completion-bar');

    if (!errorBox || !errorMessage || !progressBar || !errorProgress) { return;};

    errorMessage.innerText = message;

    errorBox.style.display = 'block';
    errorBox.style.opacity = '1';

    progressBar.classList.add('active');
    errorProgress.classList.add('active');

    setTimeout(() => {
        errorBox.style.opacity = '0';

        setTimeout(() => {
            errorBox.style.display = 'none';
            progressBar.classList.remove('active');
            errorProgress.classList.remove('active');
        }, 500);

    }, 6000);
}

// INTEGER → ROMAN
function convertToRoman(number) {
    let finalStr = '';

    if (!Number.isInteger(number) || number < 1 || number > 3999) {
        showError('Please enter an integer between 1–3999.');
        return '';
    }

    for (let [key, value] of Object.entries(romanDict)) {
        let count = Math.floor(number / value);

        finalStr += key.repeat(count);
        number -= value * count;
    }

    return finalStr;
}

// MODE SWITCHING

function switchMode() {
    if (toggleSwitch.checked) {
        // Roman → Integer
        intToRoman.style.display = 'none';
        romanToInt.style.display = 'block';

        modeTitle.textContent = 'Roman Numeral into Integer';

        localStorage.setItem('mode', 'roman-to-int');

    } else {
        // Integer → Roman
        intToRoman.style.display = 'block';
        romanToInt.style.display = 'none';

        modeTitle.textContent = 'Integer into Roman Numeral';

        localStorage.setItem('mode', 'int-to-roman');
    }

    // Clear previous result when switching modes
    romanOutput.textContent = '--';
}


// -------------------------
// LOAD SAVED MODE
// -------------------------

const savedMode = localStorage.getItem('mode');

if (savedMode === 'roman-to-int') {
    toggleSwitch.checked = true;
} else {
    toggleSwitch.checked = false;
}

switchMode();


const switchButton = document.getElementById('switch');

switchButton.addEventListener('click', function() {
    toggleSwitch.checked = !toggleSwitch.checked;
    switchMode();
});

// -------------------------
// FORM SUBMISSION
// -------------------------

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (toggleSwitch.checked) {
        // Roman → Integer

        const romanInput = document.getElementById('roman-input');
        const roman = romanInput.value.trim().toUpperCase();

        romanOutput.textContent = convertToInteger(roman);

    } else {
        // Integer → Roman

        const integerInput = document.getElementById('integer-input');
        const number = Number(integerInput.value);

        romanOutput.textContent = convertToRoman(number);
    }
});