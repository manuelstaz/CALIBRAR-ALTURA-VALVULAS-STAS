// script.js
const valveInputs = document.querySelectorAll('.valve-input');

valveInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.toggle('marked');
        // Limpiar el mensaje al enfocar (opcional)
        input.nextElementSibling.textContent = '';
    });

    input.addEventListener('blur', () => {
        const index = parseInt(input.dataset.index);
        const enteredValue = parseInt(input.value);
        const messageDiv = input.nextElementSibling; // El siguiente elemento hermano es el div.message

        if (!isNaN(enteredValue)) {
            const idealAverage = 11;
            const difference = idealAverage - enteredValue;
            const rowId = input.closest('.row').id;
            let valveType = '';

            if (rowId === 'escape-row') {
                valveType = 'ESCAPE';
            } else if (rowId === 'admission-row') {
                valveType = 'ADMISIÓN';
            }

            let message = '';
            if (difference > 0) {
                message = `Aumenta ${difference} mm (Escape).`;
                if (valveType === 'ADMISIÓN') message = `Aumenta ${difference} mm (Admisión).`;
            } else if (difference < 0) {
                message = `Disminuye ${Math.abs(difference)} mm (Escape).`;
                if (valveType === 'ADMISIÓN') message = `Disminuye ${Math.abs(difference)} mm (Admisión).`;
            } else {
                message = `Promedio ideal (Escape).`;
                if (valveType === 'ADMISIÓN') message = `Promedio ideal (Admisión).`;
            }

            messageDiv.textContent = message;
        } else {
            messageDiv.textContent = ''; // Limpiar el mensaje si no hay valor válido
        }
    });
});

// Lógica para el botón de "VOLTEAR POSICIÓN"
const togglePositionButton = document.getElementById('toggle-position');
const escapeRow = document.getElementById('escape-row');
const admissionRow = document.getElementById('admission-row');
const escapeLabel = escapeRow.querySelector('label');
const admissionLabel = admissionRow.querySelector('label');

togglePositionButton.addEventListener('click', () => {
    const tempLabel = escapeLabel.textContent;
    escapeLabel.textContent = admissionLabel.textContent;
    admissionLabel.textContent = tempLabel;
});

// Lógica para el botón de "RESET"
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas restablecer los valores?")) {
        valveInputs.forEach(input => {
            input.value = ''; // Limpia los campos de entrada
            input.classList.remove('marked'); // Remueve la clase 'marked'
            input.nextElementSibling.textContent = ''; // Limpia los mensajes
            // Aquí iría la lógica para regenerar los valores default ocultos
        });
        console.log("Valores reseteados.");
    }
});
