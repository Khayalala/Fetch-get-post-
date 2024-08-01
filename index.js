const baseURL = "http://localhost:3000";
const form = document.querySelector("form");
const nameInput = form.querySelector('input[type="name"]');
const priceInput = form.querySelector('input[type="price"]');
const quantInput = form.querySelector('input[type="quantity"]');
const submitButton = form.querySelector('button');
const productsConatiner = document.querySelector(".products_container");

async function getAndDisplayAllProducts(){
    const data = await fetch(`${baseURL}/products`);
    const productsArray = await data.json();
    productsArray.forEach(product => {
        productsConatiner.innerHTML+=`
            <h4>${product.name}</h4>
            <h5>${product.price}</h5>
            <h4>${product.quantity}</h4>
            <hr>`
    });
};
getAndDisplayAllProducts();
async function addNewProduct(){
    await fetch(`${baseURL}/products`, {
        method: "POST",
        
        body: JSON.stringify({
            name: `${nameInput.value}`,
            price: `${priceInput.value}`,
            quantity: `${quantInput.value}`
        }),

        headers: { 
            "Content-type": "application/json; charset=UTF-8"
        }
    });
};

submitButton.addEventListener("mouseover", (e)=>{
    if(!nameInput.value||!priceInput.value||!quantInput.value){
        submitButton.classList.add('disabled_cursor');
        submitButton.disabled=true;
    } else{
        submitButton.disabled=false;
        submitButton.classList.remove('disabled_cursor');
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            addNewProduct();
        })
    }
});
submitButton.addEventListener('mouseleave', () => {
    submitButton.classList.remove('disabled_cursor');
    submitButton.disabled = false;
});