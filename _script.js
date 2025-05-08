const valveInputs = document.querySelectorAll('.valve-input');
const initialTolerances = Array.from({ length: 24 }, () => Math.floor(Math.random() * 7) + 8);

valveInputs.forEach((input, index) => {
    input.dataset.tolerance = initialTolerances[index];

    input.addEventListener('focus', () => {
        input.classList.toggle('marked');
        input.nextElementSibling.textContent = '';
    });

    input.addEventListener('blur', () => {
        calculateAndDisplayMessage(input);
    });

    input.addEventListener('click', () => {
        input.classList.toggle('fixed'); // Al hacer clic, se fija o quita el color verde
    });
});

function calculateAndDisplayMessage(input) {
    const enteredValue = parseInt(input.value);
    const tolerance = parseInt(input.dataset.tolerance);
    const messageDiv = input.nextElementSibling;
    const idealAverage = 11;
    const difference = idealAverage - (isNaN(enteredValue) ? tolerance : enteredValue);
    const rowId = input.closest('.valve-row').id;
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
            message = `+${difference}`;
        } else if (difference < 0) {
            message = `${difference}`;
        } else {
            message = `=`;
        }
    } else {
        message = `Def: ${tolerance}`;
    }

    messageDiv.textContent = message;
}

// Lógica para el botón de "VOLTEAR POSICIÓN" (sin cambios importantes)
const togglePositionButton = document.getElementById('toggle-position');
const escapeRow = document.getElementById('escape-row');
const admissionRow = document.getElementById('admission-row');
const escapeLabel = document.querySelector('.valve-group:first-child label');
const admissionLabel = document.querySelector('.valve-group:last-child label');
const escapeInputsContainer = Array.from(escapeRow.querySelectorAll('.input-container'));
const admissionInputsContainer = Array.from(admissionRow.querySelectorAll('.input-container'));

togglePositionButton.addEventListener('click', () => {
    const tempLabel = escapeLabel.textContent;
    escapeLabel.textContent = admissionLabel.textContent;
    admissionLabel.textContent = tempLabel;

    escapeInputsContainer.forEach((container, index) => {
        const escapeInput = container.querySelector('.valve-input');
        const admissionContainer = admissionInputsContainer[index];
        const admissionInput = admissionContainer.querySelector('.valve-input');

        const tempValue = escapeInput.value;
        const tempMarked = escapeInput.classList.contains('marked');
        const tempFixed = escapeInput.classList.contains('fixed');

        escapeInput.value = admissionInput.value;
        escapeInput.className = 'valve-input'; // Resetear clases
        if (admissionInput.classList.contains('marked')) escapeInput.classList.add('marked');
        if (admissionInput.classList.contains('fixed')) escapeInput.classList.add('fixed');

        admissionInput.value = tempValue;
        admissionInput.className = 'valve-input'; // Resetear clases
        if (tempMarked) admissionInput.classList.add('marked');
        if (tempFixed) admissionInput.classList.add('fixed');
    });
});

// Lógica para el botón de "CONTROL" (puedes añadir funcionalidad aquí si es necesario)
const controlButton = document.getElementById('control-button');
controlButton.addEventListener('click', () => {
    alert("Botón de Control presionado (sin funcionalidad específica aún).");
});

// Lógica para el botón de "REFRESH"
const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', () => {
    valveInputs.forEach(input => {
        input.value = '';
        input.classList.remove('marked');
        calculateAndDisplayMessage(input); // Mostrar solo el valor default
    });
});

// Lógica para el botón de "RESET TOTAL"
const resetTotalButton = document.getElementById('reset-total-button');
resetTotalButton.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas realizar un RESET TOTAL? Esto borrará todos los valores y el estado fijo.")) {
        valveInputs.forEach((input, index) => {
            input.value = '';
            input.classList.remove('marked');
            input.classList.remove('fixed');
            input.dataset.tolerance = Math.floor(Math.random() * 7) + 8;
            input.nextElementSibling.textContent = `Def: ${input.dataset.tolerance}`;
        });
        console.log("RESET TOTAL realizado.");
    }
});
