let cart = JSON.parse(localStorage.getItem("cart")) || [];



async function placeOrder() {
const button = document.getElementById("placeOrderBtn");

button.disabled = true;
button.textContent = "Sending Order...";

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const note = document.getElementById("note").value.trim();

   if (!name || !phone || !address) {
    alert("Please fill in all required fields.");
    button.disabled = false;
    button.textContent = "Place Order";
    return;
}

    if (cart.length === 0) {
    alert("Your cart is empty.");
    button.disabled = false;
    button.textContent = "Place Order";
    return;
}

    let orderDetails = "";
    let grandTotal = 0;

    cart.forEach(product => {

        const itemTotal = product.price * product.quantity;

        grandTotal += itemTotal;

        orderDetails +=
`${product.name}
Quantity: ${product.quantity}
Price: ₦${itemTotal.toLocaleString()}

`;

    });

    try {

      console.log("Sending order...");

const response = await fetch("https://formspree.io/f/xjgnkapv", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify({

                name,

                phone,

                email,

                address,

                note,

                order: orderDetails,

                total: `₦${grandTotal.toLocaleString()}`

            })

        });

        if (response.ok) {

           localStorage.removeItem("cart");

window.location.href = "thankyou.html";
        } else {

            alert("Something went wrong. Please try again.");
            button.disabled = false;
button.textContent = "Place Order";

        }

    } catch (error) {

        alert("Network error. Please check your internet connection.");
        button.disabled = false;
button.textContent = "Place Order";

    }

}
