function capitalizeWord(input) {
    return input.toUpperCase();
}

// Exemple d'utilisation
const lastname = document.querySelector('#lastname');
lastname.addEventListener('keypress', (event) => {
    const value = event.target.value;
    event.target.value = capitalizeWord(value);
});

function capitalizeFirstLetter(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

// Exemple d'utilisation
const firstname = document.querySelector('#firstname');
firstname.addEventListener('keypress', (event) => {
    const value = event.target.value;
    event.target.value = capitalizeFirstLetter(value);
});

// récupération de l'élément input et de l'élément span
var matricule = document.getElementById('matricule');
var span = document.getElementById('spanChiffre');
var bAjoutAgent = document.getElementById('bAjoutAgent');

// ajout d'un écouteur d'événement pour détecter les modifications de l'input
matricule.addEventListener('input', function () {
    // si la valeur de l'input n'est pas un nombre, on affiche le message dans le span
    if (isNaN(matricule.value)) {
        span.innerHTML = 'Veuillez entrer un nombre!';
        bAjoutAgent.value = 'prout';
    } else {
        span.innerHTML = '';
    }
});
