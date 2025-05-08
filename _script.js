/* style.css */
/* ... otros estilos ... */

.arrow-indicator {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.arrow-indicator img {
    width: 30px;
    height: auto;
    margin-right: 5px;
}

.table-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    width: 100%;
    overflow-x: auto; /* Permite el desplazamiento horizontal si la tabla es muy ancha */
}

.valve-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.valve-row {
    display: flex;
    align-items: center;
    gap: 5px;
}

.valve-row label {
    width: 80px;
    text-align: right;
    font-weight: bold;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centrar el input y el mensaje */
    width: 60px; /* Ancho fijo para cada columna */
    position: relative;
}

.position-label {
    position: absolute;
    top: -10px;
    font-size: 0.7em;
    color: #777;
}

.valve-input {
    padding: 8px;
    border: 1px solid #90caf9;
    border-radius: 4px;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    font-size: 0.8em;
    cursor: pointer; /* Indicar que es interactivo para fijar color */
}

.valve-input.marked {
    background-color: #c8e6c9; /* Verde claro para marcado temporal */
}

.valve-input.fixed {
    background-color: #aed581; /* Verde más oscuro para indicar fijo */
    color: #fff; /* Texto blanco para mejor contraste */
}

.input-container .message {
    font-size: 0.6em;
    color: #555;
    text-align: center;
    margin-top: 3px;
    font-style: italic;
    min-height: 1.2em; /* Espacio mínimo para el mensaje */
}

.controls-container {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.controls-container button {
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    background-color: #64b5f6; /* Otro tono de azul para los controles */
    transition: background-color 0.3s ease;
}

.controls-container button:hover {
    background-color: #1e88e5;
}
