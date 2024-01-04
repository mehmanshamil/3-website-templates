let product = document.getElementById("product");
let max = document.getElementById("max");
let min = document.getElementById("min");
let form = document.getElementById("form");
let inp = document.getElementById("inp");

form.addEventListener("submit", search)
max.addEventListener("click", maxfunc)
min.addEventListener("click", minfunc)

function maxfunc() {
    let getData = JSON.parse(localStorage.getItem('cart')) || []
    let data = getData.sort((a, b) => (b.price - a.price))
    display(data)
}


function minfunc() {
    let getData = JSON.parse(localStorage.getItem('cart')) || []
    let data = getData.sort((a, b) => (a.price - b.price))
    display(data)
}

function getData() {
    let data = JSON.parse(localStorage.getItem('cart')) || []
    display(data)
}

function search(e) {
    e.preventDefault()
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let data = cart.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()))
    display(data)
}

getData()
function display(data) {
    product.innerHTML = ''
    data.forEach((item, index) => {
        let div = document.createElement('div')
        div.className = 'box'
        div.innerHTML = `
        <img src="${item.image}" alt="">
        <p>${item.title}</p>
        <h3>${item.price}$</h3>
        <button onclick="removetocart(${index})"><i mx-1 class="fa-solid fa-trash"></i> Remove to cart</button>
        `
        product.appendChild(div)
    })
}

function removetocart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cart));
    getData()
    totalLength()
}

function totalLength(){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    price.innerHTML=`${cart.length}`
}
totalLength()