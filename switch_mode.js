const intToRoman = document.getElementById('integer-to-roman');
const romanToInt = document.getElementById('roman-to-integer');
const toggleSwitch = document.getElementById('toggleCheckbox');

function switchMode() {
    if (toggleSwitch.checked) {
        intToRoman.style.display = 'none';
        romanToInt.style.display = 'block';

        localStorage.setItem('mode', 'roman-to-int');
    } else {
        intToRoman.style.display = 'block';
        romanToInt.style.display = 'none';

        localStorage.setItem('mode', 'int-to-roman');
    }
}

const savedMode = localStorage.getItem('mode');

if (savedMode === 'roman-to-int') {
    toggleSwitch.checked = true;
} else {
    toggleSwitch.checked = false;
}

switchMode();

toggleSwitch.addEventListener('change', switchMode);