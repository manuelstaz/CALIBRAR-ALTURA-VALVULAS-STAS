// script.js
const valveInputs = document.querySelectorAll('.valve-input');

valveInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.classList.toggle('marked'); // Alterna la clase 'marked' al enfocar
    });

    // Aquí puedes agregar la lógica para calcular y mostrar el mensaje
    input.addEventListener('blur', () => {
        const index = parseInt(input.dataset.index);
        const enteredValue = parseInt(input.value);

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
                message = `AUMENTA la altura en ${difference} mm para llegar al promedio ideal de ${valveType}.`;
            } else if (difference < 0) {
                message = `DISMINUYE la altura en ${Math.abs(difference)} mm para llegar al promedio ideal de ${valveType}.`;
            } else {
                message = `La altura está en el promedio ideal de ${valveType}.`;
            }

            // Aquí podrías mostrar el mensaje en el div .messages-container
            console.log(`Campo ${index} (${valveType}): ${message}`);
            // Por ahora, lo mostramos en la consola. Luego lo integraremos al HTML.
        }
    });
});

// Lógica para el botón de "VOLTEAR POSICIÓN"
const togglePositionButton = document.getElementById('toggle-position');
const escapeRow = document.getElementById('escape-row');
const admissionRow = document.getElementById('admission-row');

togglePositionButton.addEventListener('click', () => {
    const escapeLabel = escapeRow.querySelector('label');
    const admissionLabel = admissionRow.querySelector('label');

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
            // Aquí iría la lógica para regenerar los valores default ocultos
            // Por ahora, solo limpiamos la visualización
        });
        // Aquí también podrías limpiar los mensajes mostrados
        console.log("Valores reseteados.");
    }
});