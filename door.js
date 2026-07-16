      
let cart =JSON.parse(localStorage.getItem("cart")) || [];
let orderForm = document.querySelector(".order_form");

     let  popup =document.querySelector(".product_popup");

let popupName = document.querySelector(".popup-name");
console.log(popupName);

let popupPrice = document.querySelector(".popup_price");
let popupSize = document.querySelector(".popup_size");
let popupType = document.querySelector(".popup_type");

let popupImage = document.querySelector(".product_popup_image img");

let total = document.querySelector(".total");

let PopupInput = document.querySelector(".quantity");
let CurrentPrice = 0;

PopupInput.addEventListener("input", function(){
let qty = Number(PopupInput.value);
let result = qty * CurrentPrice;
total.textContent = "Total: $"+ result;
});
 

       function buy(button){

    popup.style.display = "flex";

    let card = button.parentElement;

    let image = card.querySelector(".door_cards_image img");
    let name = card.querySelector(".door_name").textContent;
    let type = card.querySelector(".door_type").textContent;
    let size = card.querySelector(".door_size").textContent;

    let price = Number(
        card.querySelector(".door_price").textContent.replace(/[₦,]/g, "")
    );

    const product = {
        name: name,
        price: price,
        image: image.src,
        quantity: 1
    };

    const existingProduct = cart.find(item => item.name === product.name);

    if(existingProduct){
        existingProduct.quantity++;
    }else{
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Popup information
    popupName.textContent = name;
    popupType.textContent = type;
    popupSize.textContent = size;
    popupPrice.textContent = "Price: ₦" + price.toLocaleString();
    popupImage.src = image.src;

    CurrentPrice = price;
    PopupInput.value = 1;
    total.textContent = "Total: ₦" + price.toLocaleString();

}
            

        function close_popup(){
           console.log( popup.style.display ="none");
        }
function order(){
   console.log( orderForm.style.display = "flex");
    console.log(popup.style.display="none");
}
function ok(){
    console.log(orderForm.style.display = "none");
}

document.querySelectorAll(".wishlist").forEach(function(heart){

    heart.addEventListener("click", function(){

        const icon = this.querySelector("i");

        icon.classList.toggle("fa-solid");
        icon.classList.toggle("fa-regular");

        this.classList.toggle("liked");

    });

});
     

const filterButtons = document.querySelectorAll(".filter_buttons button");

filterButtons.forEach(button => {

    button.addEventListener("click", function(){

        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const category = this.dataset.filter;

        doors.forEach(door => {

            if(category === "all"){
                door.style.display = "block";
            }
            else if(door.dataset.category === category){
                door.style.display = "block";
            }
            else{
                door.style.display = "none";
            }

        });

    });

});

function updateCartCount() {
    document.getElementById("cartCount").textContent = cart.length;
}

updateCartCount();

let activeFilter = "all";
let searchQuery = "";

function updateDisplay() {
    doorCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector(".door_name").textContent.toLowerCase();

        const matchesFilter =
            activeFilter === "all" || category === activeFilter;

        const matchesSearch =
            title.includes(searchQuery);

        card.style.display =
            matchesFilter && matchesSearch ? "block" : "none";
    });
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        activeFilter = button.dataset.filter;
        updateDisplay();
    });
});

searchInput.addEventListener("input", e => {
    searchQuery = e.target.value.toLowerCase().trim();
    updateDisplay();
});

