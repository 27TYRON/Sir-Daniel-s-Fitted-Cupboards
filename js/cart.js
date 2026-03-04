let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI(){
    let count = document.getElementById("cart-count");
    let total = document.getElementById("cart-total");

    if(count && total){
        count.textContent = cart.length;
        total.textContent = cart.reduce((sum,item)=>sum+item.price,0);
    }
}

function addToCart(name,price){
    cart.push({name,price});
    saveCart();
    updateCartUI();
    alert("Added to cart");
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
    loadCartPage();
}

function loadCartPage(){
    let container = document.getElementById("cart-items");
    if(!container) return;

    container.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{
        total+=item.price;
        container.innerHTML+=`
        <div class="cart-item">
            ${item.name} - R ${item.price}
            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    container.innerHTML+=`<h3>Total: R ${total}</h3>`;
}

function sendWhatsApp(){
    let message="Hello, I would like to order:%0A";
    let total=0;

    cart.forEach(item=>{
        message+=`${item.name} - R ${item.price}%0A`;
        total+=item.price;
    });

    message+=`Total: R ${total}`;

    window.open(`https://wa.me/27813421958?text=${message}`);
}

updateCartUI();
loadCartPage();