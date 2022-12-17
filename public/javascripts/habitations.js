const containerTable = document.getElementById('container-table');
const form = document.getElementById('form');

function toggleForm() {
    $('#container-table, #form').toggle();
}

$('#add, #btn-cancel').click(() => toggleForm());
