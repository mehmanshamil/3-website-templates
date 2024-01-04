let form = document.getElementById("form");
let email = document.getElementById("email");
let display = document.getElementById("display");
let pass = document.getElementById("pass");
let detail = document.getElementById("detail");
form.addEventListener("submit", getForm)

function getForm(e) {
    e.preventDefault()
    let data = {
        email: `${email.value}`,
        password: `${pass.value}`
    }
    axios.post("https://655f2b37879575426b44b8f7.mockapi.io/basket", data)
        .then(() => seenForm())
}

async function seenForm() {
    display.innerHTML = ''
    await axios.get("https://655f2b37879575426b44b8f7.mockapi.io/basket")
        .then((res) => {
            let db = res.data
            db.forEach((item) => {
                let div = document.createElement("div")
                div.className = "formBox"
                div.innerHTML = `
            <p><h6>Email: ${item.email}</h6> </p>
            <h6>Password :</h6>
            <input type="password" value="${item.password}">
            <div class="d-flex formbtns">
            <button class="chngForm" onclick="chngFunc(${item.id})">Change</button>
            <button class="dltForm" onclick="funcdlt(${item.id})">Delete</button>
             </div>
            `
                display.appendChild(div)
            })
        })
}
seenForm()
function funcdlt(id) {
    axios.delete(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`)
        .then(() => seenForm())
}
async function chngFunc(id) {
    detail.style.display = "block"
    await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`)
        .then((res) => {
            let db = res.data
            detail.innerHTML = `
       <div class="d-flex flex-column w-100 align-items-center justify-content-center">
       <div class="w-75 d-flex mt-5 flex-column">
       <i id="close" class="fa-solid fa-x"></i>
           <h6>Email :</h6>
           <input id="newEmail" type="email" value="${db.email}">
           <h6>Password :</h6>
           <input id="newPass" type="text" value="${db.password}">
           <button id="saveFunc" onclick="saveFunc(${db.id})">Save</button>
       </div>
   </div>
       `
        })

    let close = document.getElementById("close")
    close.addEventListener("click", closeFunc)
}

function closeFunc() {
    detail.style.display = "none"
}

function saveFunc(id) {
    let newPass = document.getElementById("newPass")
    let newEmail = document.getElementById("newEmail")
    let data = {
        email: `${newEmail.value}`,
        password: `${newPass.value}`
    }
    axios.put(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`, data)
        .then(() => seenForm())
    closeFunc()
}