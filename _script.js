const valveInputs = document.querySelectorAll('.valve-input');
const initialTolerances = Array.from({ length: 16 }, () => Math.floor(Math.random() * 7) + 8); // Genera tolerancias aleatorias (8-14)

valveInputs.forEach((input, index) => {
    input.dataset.tolerance = initialTolerances[index]; // Asigna la tolerancia oculta

    input.addEventListener('focus', () => {
        input.classList.toggle('marked');
        input.nextElementSibling.textContent = ''; // Limpiar mensaje al enfocar
    });

    input.addEventListener('blur', () => {
        const enteredValue = parseInt(input.value);
        const tolerance = parseInt(input.dataset.tolerance);
        const messageDiv = input.nextElementSibling;
        const idealAverage = 11;
        const difference = idealAverage - (isNaN(enteredValue) ? tolerance : enteredValue);
        const rowId = input.closest('.row').id;
        let valveType = '';

        if (rowId === 'escape-row') {
            valveType = 'ESCAPE';
        } else if (rowId === 'admission-row') {
            valveType = 'ADMISIÓN';
        }

        let message = '';
        if (!isNaN(enteredValue)) {
            if (difference > 0) {
                message = `Aumenta ${difference} mm (${valveType}).`;
            } else if (difference < 0) {
                message = `Disminuye ${Math.abs(difference)} mm (${valveType}).`;
            } else {
                message = `Promedio ideal (${valveType}).`;
            }
        } else {
            message = `Valor default: ${tolerance} mm (${valveType}). Ingrese valor.`;
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
const escapeInputs = escapeRow.querySelectorAll('.input-container');
const admissionInputs = admissionRow.querySelectorAll('.input-container');

togglePositionButton.addEventListener('click', () => {
    const tempLabel = escapeLabel.textContent;
    escapeLabel.textContent = admissionLabel.textContent;
    admissionLabel.textContent = tempLabel;

    // Opcional: Intercambiar también los valores y marcados (si es necesario)
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
            input.value = ''; // Limpia los campos de entrada
            input.classList.remove('marked'); // Remueve la clase 'marked'
            input.dataset.tolerance = Math.floor(Math.random() * 7) + 8; // Regenera la tolerancia
            input.nextElementSibling.textContent = `Valor default: ${input.dataset.tolerance} mm (${input.closest('.row').id === 'escape-row' ? 'ESCAPE' : 'ADMISIÓN'}). Ingrese valor.`;
        });
        console.log("Valores reseteados.");
    }
});
