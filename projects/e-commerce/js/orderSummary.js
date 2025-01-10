/*
Emily Faso
12-12-2024
Advanced JavaScript Final Project
orderSummary.js file
*/

// initialize page with DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // get query parameters from URL using window.location.search
    const params = new URLSearchParams(window.location.search);
    // get orderData information from query string
    const orderData = params.get('orderData');

    // use const to assign orderDetailsContainer with order-details id information
    const orderDetailsContainer = document.getElementById('order-details');
    // use const to assign backToCartLink with back-to-cart id information
    const backToCartLink = document.getElementById('back-to-cart');

    // if there is orderData
    if (orderData) {
        try {
            // use JSON parse to parse through orderData
            const cartItems = JSON.parse(decodeURIComponent(orderData));

            // if there is nothing in the cart when user tries to submit, use paragraph text to display to user that their cart is empty, ('Your cart is empty.')
            if (cartItems.length === 0) {
                orderDetailsContainer.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            // use const to assign table with a new element table for the shopping cart items
            const table = document.createElement('table');
            // assign that table element to order-summary-table class
            table.className = 'order-summary-table';
            // use const to assign headerRow to columns titles for item name, quantity, price, and extended price
            const headerRow = `
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Extended Price</th>
                </tr>`;
            // add header row to html
            table.innerHTML = headerRow;

            // assign variable total with 0, then loop through each shopping cart item and create table rows for each
            let total = 0;
            cartItems.forEach((item) => {
                // use const to assign extendedPrice with equation that will reveal extended price (the items price times the item count)
                const extendedPrice = item.price * item.count;
                total += extendedPrice;

                // use const to assign row with table row item details such as specific item names, item count, item price, and item extended price
                const row = `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.count}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${extendedPrice.toFixed(2)}</td>
                    </tr>`;
                // add row to table on html
                table.innerHTML += row;
            });

            // use const to assign totalRow with total amount in shopping cart
            const totalRow = `
                <tr class="total-row">
                    <td colspan="3"><strong>Total:</strong></td>
                    <td><strong>$${total.toFixed(2)}</strong></td>
                </tr>`;
            // add total row to table on html
            table.innerHTML += totalRow;

            // append table to orderDetailsContainer
            orderDetailsContainer.appendChild(table);
        // create catch error for when there is an error displaying order details 
        } catch (error) {
            orderDetailsContainer.innerHTML = '<p>Error displaying order details.</p>';
        }
    // otherwise, display that the error is because no order data is available, if no orderData exists 
    } else {
        orderDetailsContainer.innerHTML = '<p>Error: no order is data available.</p>';
    }

    // create on click event listener that takes users back to shoppingCart.html page through the back to cart link
    backToCartLink.addEventListener('click', () => {
        window.location.href = 'shoppingCart.html';
    });
});
