const form = document.getElementById('converter-form');
const roman_output = document.getElementById('roman-numeral');

let roman_dict = {
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

function showError(message) {
    const errorBox = document.getElementById('error-message-box');
    const errorMessage = document.getElementById('error-message');
    const progressBar = errorBox.querySelector('.progress-bar');
    const errorProgress = document.getElementById('completion-bar');

    if (!errorBox || !errorMessage || !progressBar || !errorProgress) return;

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

function convert_to_roman(number) {
    let final_str = '';

    if (!Number.isInteger(number) || number < 1 || number > 3999) {
        showError('Please enter an integer between 1-3999.');
        return final_str;
    } 

    for (let [key, value] of Object.entries(roman_dict)) {
        let count = Math.floor(number / value);

        final_str += key.repeat(count);
        number -= value * count;
    }

    return final_str;
}

// Detect when user submits a number, and calls convert_to_roman
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const number = Number(formData.get('number'));

    roman_output.textContent = convert_to_roman(number);
});