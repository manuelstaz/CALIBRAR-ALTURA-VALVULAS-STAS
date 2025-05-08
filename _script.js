const valveInputs = document.querySelectorAll('.valve-input');
const initialTolerances = Array.from({ length: 24 }, () => Math.floor(Math.random() * 7) + 8); // 24 tolerancias

valveInputs.forEach((input, index) => {
    input.dataset.tolerance = initialTolerances[index];

    input.addEventListener('focus', () => {
        input.classList.toggle('marked');
        input.nextElementSibling.textContent = '';
    });

    input.addEventListener('blur', () => {
        const enteredValue = parseInt(input.value);
        const tolerance = parseInt(input.dataset.tolerance);
        const messageDiv = input.nextElementSibling;
        const idealAverage = 11;
        const difference = idealAverage - (isNaN(enteredValue) ? tolerance : enteredValue);
        const rowId = input.closest('.row').id;
        const position = input.closest('.input-container').dataset.position;
        let valveType = '';

        if (rowId === 'escape-row') {
            valveType = 'ESCAPE';
        } else if (rowId === 'admission-row') {
            valveType = 'ADMISIÓN';
        }

        let message = '';
        if (!isNaN(enteredValue)) {
            if (difference > 0) {
                message = `Aumenta ${difference} mm (${valveType} - Pos. ${position}).`;
            } else if (difference < 0) {
                message = `Disminuye ${Math.abs(difference)} mm (${valveType} - Pos. ${position}).`;
            } else {
                message = `Promedio ideal (${valveType} - Pos. ${position}).`;
            }
        } else {
            message = `Default: ${tolerance} mm (${valveType} - Pos. ${position}). Ingrese valor.`;
        }

        messageDiv.textContent = message;
    });
});

// Lógica para el botón de "VOLTEAR POSICIÓN"
const togglePositionButton = document.getElementById('toggle-position');
const escapeRow = document.getElementById('escape-row');
const admissionRow = document.getElementById('admission-row');
const escapeLabel = escapeRow.querySelector('label');
const admissionLabel = admissionRow.querySelector('label');
const escapeInputs = Array.from(escapeRow.querySelectorAll('.input-container'));
const admissionInputs = Array.from(admissionRow.querySelectorAll('.input-container'));

togglePositionButton.addEventListener('click', () => {
    const tempLabel = escapeLabel.textContent;
    escapeLabel.textContent = admissionLabel.textContent;
    admissionLabel.textContent = tempLabel;

    // Intercambiar valores y marcado
    escapeInputs.forEach((container, index) => {
        const escapeInput = container.querySelector('.valve-input');
        const admissionContainer = admissionInputs[index];
        const admissionInput = admissionContainer.querySelector('.valve-input');

        const tempValue = escapeInput.value;
        const tempMarked = escapeInput.classList.contains('marked');

        escapeInput.value = admissionInput.value;
        if (admissionInput.classList.contains('marked')) {
            escapeInput.classList.add('marked');
        } else {
            escapeInput.classList.remove('marked');
        }

        admissionInput.value = tempValue;
        if (tempMarked) {
            admissionInput.classList.add('marked');
        } else {
            admissionInput.classList.remove('marked');
        }
    });
});

// Lógica para el botón de "RESET"
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas restablecer los valores?")) {
        valveInputs.forEach((input, index) => {
            input.value = '';
            input.classList.remove('marked');
            input.dataset.tolerance = Math.floor(Math.random() * 7) + 8;
            const rowId = input.closest('.row').id;
            const position = input.closest('.input-container').dataset.position;
            const valveType = rowId === 'escape-row' ? 'ESCAPE' : 'ADMISIÓN';
            input.nextElementSibling.textContent = `Default: ${input.dataset.tolerance} mm (${valveType} - Pos. ${position}). Ingrese valor.`;
        });
        console.log("Valores reseteados.");
    }
});
