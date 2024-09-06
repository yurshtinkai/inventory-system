document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const equipmentName = document.getElementById('equipment-name').value;
    const equipmentType = document.getElementById('equipment-type').value;
    const equipmentQuantity = document.getElementById('equipment-quantity').value;
    const equipmentStatus = document.getElementById('equipment-status').value;
    const isEditing = document.getElementById('inventory-form').getAttribute('data-editing');

    if (equipmentName && equipmentType && equipmentQuantity && equipmentStatus) {
        if (isEditing) {
            updateItemInTable(equipmentName, equipmentType, equipmentQuantity, equipmentStatus);
        } else {
            addItemToTable(equipmentName, equipmentType, equipmentQuantity, equipmentStatus);
        }
        clearForm();
    }
});

document.getElementById('view-equipment-btn').addEventListener('click', function() {
    const tableContainer = document.getElementById('equipment-table-container');
    tableContainer.classList.toggle('hidden');  // Toggles visibility of the equipment table
});

function addItemToTable(name, type, quantity, status) {
    const tableBody = document.getElementById('inventory-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td class="name">${name}</td>
        <td class="type">${type}</td>
        <td class="quantity">${quantity}</td>
        <td class="status">${status}</td>
        <td>
            <button class="btn btn-warning btn-sm edit" onclick="editItem(this)">Edit</button>
            <button class="btn btn-danger btn-sm delete" onclick="removeItem(this)">Remove</button>
        </td>
    `;
    tableBody.appendChild(row);
}

function clearForm() {
    document.getElementById('inventory-form').reset();
    document.getElementById('inventory-form').removeAttribute('data-editing');
    document.getElementById('inventory-form').removeAttribute('data-editing-row');
    document.getElementById('submit-btn').textContent = 'Add Equipment';
    document.getElementById('form-title').textContent = 'Add New Equipment';
}

function removeItem(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function editItem(button) {
    const row = button.parentElement.parentElement;

    const name = row.querySelector('.name').textContent;
    const type = row.querySelector('.type').textContent;
    const quantity = row.querySelector('.quantity').textContent;
    const status = row.querySelector('.status').textContent;

    document.getElementById('equipment-name').value = name;
    document.getElementById('equipment-type').value = type;
    document.getElementById('equipment-quantity').value = quantity;
    document.getElementById('equipment-status').value = status;

    document.getElementById('inventory-form').setAttribute('data-editing', 'true');
    document.getElementById('inventory-form').setAttribute('data-editing-row', row.rowIndex);

    document.getElementById('submit-btn').textContent = 'Update Equipment';
    document.getElementById('form-title').textContent = 'Edit Equipment';
}

function updateItemInTable(name, type, quantity, status) {
    const rowIndex = document.getElementById('inventory-form').getAttribute('data-editing-row');
    const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    const row = table.rows[rowIndex - 1];  

    row.querySelector('.name').textContent = name;
    row.querySelector('.type').textContent = type;
    row.querySelector('.quantity').textContent = quantity;
    row.querySelector('.status').textContent = status;

    clearForm();
}
