let product = document.getElementById("product");
let load = document.getElementById("load");
let page = 1;
let limit = 4;
load.addEventListener("click",getApi)
async function getApi() {
    await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/products?page=${page}&limit=${limit}`)
    .then((res) =>{
       db = res.data
        db.forEach((item) =>{
            let div = document.createElement('div')
            div.className='box'
            div.innerHTML=`
            <img src="${item.image}" alt="">
            <p>${item.title}</p>
            <h3>${item.price}$</h3>
            <button onclick="addtocart(${item.id})"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
            `
            product.appendChild(div)
            page++
        })
    })  
    .catch((err) => console.log(err))
}
getApi()

function addtocart(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find((item) => item.id == id));
    localStorage.setItem("cart",JSON.stringify(cart));
    console.log(cart);
}