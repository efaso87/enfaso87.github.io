/*
Emily Faso
12-12-2024
Advanced JavaScript Final Project
shoppingCart.js file
*/

// create new empty array to store items for sale on page
let items = [];
// create new empty array to store items in users cart
let cart = [];

// get elements by their corresponding ids for item container, cart container, sort select, filter select, cart total, and finalizeOrderButton
const itemsContainer = document.getElementById('items-container');
const cartContainer = document.getElementById('cart-container');
const sortSelect = document.getElementById('sort');
const filterSelect = document.getElementById('filter-category');
const cartTotal = document.getElementById('cart-total');
const finalizeOrderButton = document.getElementById('finalize-order');

// initialize page with DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // use const to assign savedItems with items saved from sessionStorage, create an empty array if none are present
    const savedItems = JSON.parse(sessionStorage.getItem('items')) || [];

    if (sessionStorage.getItem('items')) {
        const savedItems = JSON.parse(sessionStorage.getItem('items'));

        // use fetch to get items from JSON file if not in sessionStorage
        fetch("../json/items.json")
            // convert json file content to JavaScript
            .then(response => response.json())
            // combine save items with new ones from JSON excluding any duplicates
            .then(data => {
                // make sure new JSON items are only added if they are not already in saved items
                const updatedItems = savedItems.concat(data.filter(jsonItem => !savedItems.some(savedItem => savedItem.id === jsonItem.id)));
                sessionStorage.setItem('items', JSON.stringify(updatedItems));
                items = updatedItems;
                // display items from both lists together
                displayItems();
            })
            .catch(error => console.error("Error with saved items:", error));
    } else {
        // use fetch to get items from JSON file if not in sessionStorage
        fetch("../json/items.json")
            // convert json file content to JavaScript
            .then(response => response.json())
            // assign each item data a unique id 
            .then(data => {
                items = data.map((item, index) => ({
                    ...item,
                    id: item.id || `json-${index + 1}`
                }));
                // save items from both saved items and JSON items to sessionStorage
                sessionStorage.setItem('items', JSON.stringify(items));

                // display items from item container
                displayItems();
            })
            // use catch to display error if cannot load items from JSON file, displays error as well
            .catch(error => console.error("Error loading items from JSON:", error));
        }

    // use ondragover and ondrop to allow drag-and-drop actions for the shopping cart
    cartContainer.ondragover = allowDrop;
    cartContainer.ondrop = dropItem;
});


// create new function called displayItems that displays items within the items container
function displayItems(filteredItems = items) {
    // clear any previous content in container
    itemsContainer.innerHTML = '';
    // loop through each item
    filteredItems.forEach(item => {
        // create new div element for each itemElement
        const itemElement = document.createElement('div');
        // assign itemElement to item class
        itemElement.className = 'item';
        // allow itemElement to be draggable
        itemElement.draggable = true;
        // allow itemElement to allow dragStart event
        itemElement.ondragstart = (event) => dragStart(event, item);

        // set itemElement content (item name, item category, and item price) to html page
        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Category: ${item.category}</p>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Description: ${item.description}</p>
        `;

        // append item element to items container
        itemsContainer.appendChild(itemElement);
    });
}

// sort items when sort dropdown changes
sortSelect.addEventListener('change', () => {
    const filteredItems = filterItems([...items], filterSelect.value);
    const sortedItems = sortItems(filteredItems, sortSelect.value);
    displayItems(sortedItems);
});

// filter items when filter dropdown
filterSelect.addEventListener('change', () => {
    const priceRange = document.getElementById('filter-price').value;
    const filteredItems = filterItems([...items], filterSelect.value);
    const sortedItems = sortItems(filteredItems, sortSelect.value);
    displayItems(sortedItems);
});

document.getElementById('filter-price').addEventListener('change', () => {
    const priceRange = document.getElementById('filter-price').value;
    const filteredItems = filterItems([...items], filterSelect.value, priceRange);
    const sortedItems = sortItems(filteredItems, sortSelect.value);
    displayItems(sortedItems);
});

// create function called sortItems that sorts items by their criteria aka ascending and descending names and prices
function sortItems(items, criteria) {
    switch (criteria) {
        case 'priceAscending': return items.sort((a, b) => a.price - b.price);
        case 'priceDescending': return items.sort((a, b) => b.price - a.price);
        case 'nameAscending': return items.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
        case 'nameDescending': return items.sort((a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }));
        default: return items;
    }
}

// create function called filterItems that filters item by their category and price
function filterItems(items, category, priceRange) {
    let filteredItems = category === 'All' ? items : items.filter(item => item.category === category);

    switch (priceRange) {
        case 'lessThan50':
            filteredItems = filteredItems.filter(item => item.price < 50);
            break;
        case '50to99':
            filteredItems = filteredItems.filter(item => item.price >= 50 && item.price <= 99);
            break;
        case 'greaterThan100':
            filteredItems = filteredItems.filter(item => item.price >= 100);
            break;
        default:
            break;
    }

    return filteredItems;
}

filterSelect.addEventListener('change', () => {
    const selectedCategory = filterSelect.value;
    const selectedPrice = document.getElementById('filter-price').value;
    const filteredItems = filterItems([...items], selectedCategory, selectedPrice);
    const sortedItems = sortItems(filteredItems, sortSelect.value);
    displayItems(sortedItems);
});

// create function called dragStart to allow dragging of objects into cartContainer
function dragStart(event, item) {
    event.dataTransfer.setData('text/plain', JSON.stringify(item));
}

// create function called allowDrop to allow dropping of objects into cartContainer
function allowDrop(event) {
    event.preventDefault();
}

// create new function called dropItem that handles when item is dropped into shopping cart
function dropItem(event) {
    event.preventDefault();
    // get data from drag event and assign to itemData using const
    const itemData = event.dataTransfer.getData('text/plain');
    // if there is not item data, return/exit
    if (!itemData) return;

    // parse itemData using JSON.parse
    const item = JSON.parse(itemData);
    // see if exiting item is already in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    // if item is already existing in the cart, increase count
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].count++;
    // if not, assign to new item with count of 1
    } else {
        cart.push({ ...item, count: 1 });
    }

    // update cart display
    updateCart();
}

// create new function called updateCart that displays the total cart display and price
function updateCart() {
    // clear any previous data in cart container
    cartContainer.innerHTML = '';
    // initialize total price to 0
    let total = 0;

    // loop through cart items and display each
    cart.forEach((item, index) => {
        // use const to assign extendedPrice with item price multiplied by item count
        const extendedPrice = item.price * item.count;
        total += extendedPrice;

        // use const to assign cartItem to new div element
        const cartItem = document.createElement('div');
        // assign cartItem with cart-item class
        cartItem.className = 'cart-item';
        // allow item to be draggable
        cartItem.draggable = true;
        // allow item to be dragged in and out of cart
        cartItem.ondragstart = (event) => dragStart(event, item);
        // allow item to be dragged out of cart
        cartItem.ondragend = () => removeItemFromCart(index);

        // set HTML content for cartItem including item name, count, price, and extended price
        cartItem.innerHTML = `
            <p>${item.name} (x${item.count})</p>
            <p>Price: $${item.price}</p>
            <p>Extended Price: $${extendedPrice.toFixed(2)}</p>
        `;

        // append cartItem data to cartContainer
        cartContainer.appendChild(cartItem);
    });

    // update cart total
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// create function called removeItemFromCart to remove item from cart when there is no quantity left
function removeItemFromCart(index) {
    // decrease the item count and remove it if count is less than or equal to 0
    if (--cart[index].count <= 0) {
        // remove item from cart array
        cart.splice(index, 1);
    }
    // update cart once item is removed
    updateCart();
}

// use on click event listener to finalize order when finalize order button is clicked by user
finalizeOrderButton.addEventListener('click', () => {
    // if there is nothing in the cart, alert the user that their cart is empty, ('Your cart is empty!')
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // use const to assign orderData to the cart data converted to a JSON string
    const orderData = JSON.stringify(cart);
    
    // use window.location.href to send orderData to orderSummary.html page
    window.location.href = `../html/orderSummary.html?orderData=${encodeURIComponent(orderData)}`;
});
