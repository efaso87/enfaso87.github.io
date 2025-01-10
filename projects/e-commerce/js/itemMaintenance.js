/*
Emily Faso
12-12-2024
Advanced JavaScript Final Project
itemMaintenance.js file
*/

// create new empty array to store items
let items = [];

// get elements by their corresponding ids for itemForm, itemList, nameInput, categoryInput, priceInput, quantityInput, descriptionInput and the submitButton
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const nameInput = document.getElementById('item-name');
const categoryInput = document.getElementById('item-category');
const priceInput = document.getElementById('item-price');
const quantityInput = document.getElementById('item-quantity');
const descriptionInput = document.getElementById('item-description');
const submitButton = document.getElementById('submit-button');

// use let to assign editingIndex to null so it can properly store the index of items being edited
let editingIndex = null;

// create new function called loadItems to load items from sessionStorage or JSON file
function loadItems() {
    // check if items are being saved in sessionStorage
    const savedItems = JSON.parse(sessionStorage.getItem('items'));
    if (savedItems) {
        // if items are in sessionStorage use them
        items = savedItems;
        // render items after they are loaded
        renderItems();
    } else {
        // if items are not in sessionStorage, fetch them from the JSON file
        fetch('../json/items.json')
            .then((response) => {
                if (!response.ok) {
                    // throw error if items fail to load from JSON file
                    throw new Error('Failed to load items from JSON file');
                }
                return response.json();
            })
            .then((data) => {
                items = data;
                // save loaded items to sessionStorage
                saveItems();
                // render items
                renderItems();
            })
            .catch((error) => {
                console.error('Error loading items:', error);
            });
        }
    }

// create new function called saveItems that saves items to session storage
function saveItems() {
    sessionStorage.setItem('items', JSON.stringify(items));
}

// create new function called renderItems that renders the items on the page
function renderItems() {
    // clear anything previously in item list
    itemList.innerHTML = '';
    // loop through each item
    items.forEach((item, index) => {
        // create new div element for each item element
        const itemElement = document.createElement('div');
        // assign each itemElement to item class
        itemElement.className = 'item';
        // use paragraph text to add the item name, category, price, quantity, description, and edit/delete buttons to html page
        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Item ID: ${item.id}</strong></p>
            <p>Category: ${item.category}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Description: ${item.description}</p>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        // append itemElement to itemList
        itemList.appendChild(itemElement);
    });

    // create new on click event listener for edit button
    document.querySelectorAll('.edit-btn').forEach((button) =>
        button.addEventListener('click', () => editItem(button.dataset.index))
    );
    // create new on click event listener for delete button
    document.querySelectorAll('.delete-btn').forEach((button) =>
        button.addEventListener('click', () => deleteItem(button.dataset.index))
    );
}

// create new event listener for submitting the item form after adding, editing, or deleting
itemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // get and validate values for item names, item categories, item prices, item quantity, and item description
    const name = nameInput.value.trim();
    const category = categoryInput.value.trim();
    const price = parseFloat(priceInput.value.trim());
    const quantity = parseInt(quantityInput.value.trim(), 10);
    const description = descriptionInput.value.trim();

    // if name, category, description, price, or quantity fields are invalid, display message to user to make sure all fields are filled out ('Please fill out all fields!')
    if (!name || !category || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0 || !description) {
        alert('Please fill out all fields!');
        return;
    }

    // if editing index is present, update its item name, category, price, quantity, and description
    if (editingIndex !== null) {
        items[editingIndex] = { ...items[editingIndex], name, category, price, quantity, description };
        editingIndex = null;
        // then update existing item
        submitButton.textContent = 'Add Item';
    } else {
        // if not, add a new item with a new id
        const newItem = {
            id: items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1,
            name,
            category,
            price,
            quantity,
            description
        };
        // push new item into the item array
        items.push(newItem);
    }

    // save items to sessionStorage
    saveItems();
    // render items
    renderItems();
    // reset item form
    itemForm.reset();
});

// create new function to edit item
function editItem(index) {
    const item = items[index];
    nameInput.value = item.name;
    categoryInput.value = item.category;
    priceInput.value = item.price;
    quantityInput.value = item.quantity;
    descriptionInput.value = item.description;
    editingIndex = index;
    // add button for user to update item
    submitButton.textContent = 'Update Item';
}

// create new function to delete an item
function deleteItem(index) {
    const itemName = items[index].name;
    // confirm with user that they want to delete item
    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
        // if so, delete item from array
        items.splice(index, 1);
        // save updated items
        saveItems();
        // render list of items again
        renderItems();
    }
}

// initialize page with DOMContentLoaded event listener and load items from sessionStorage to be displayed
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});
