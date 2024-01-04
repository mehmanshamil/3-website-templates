let form = document.getElementById("form");
let email = document.getElementById("email");
let display = document.getElementById("display");
let detail = document.getElementById("detail");
let pass = document.getElementById("pass");
form.addEventListener("submit", getForm)

function getForm(e) {
    e.preventDefault()
    let data = {
        email: `${email.value}`,
        password: `${pass.value}`
    }
    axios.post("https://655f2b37879575426b44b8f7.mockapi.io/basket", data)
    console.log(data);
}

async function formDisplay() {
    display.innerHTML = ''
    await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/basket`)
        .then((res) => {
            let db = res.data
            db.forEach((item) => {
                let div = document.createElement("div")
                div.className = "formBox"
                div.innerHTML = `
            <p><h6>Email :</h6>${item.email}</p>
            <h6>Password :</h6>
            <input type="password" value="${item.password}">
            <div class="d-flex gap-1">
            <button class="chng"  onclick="chngfunc(${item.id})">Change</button>
            <button class="delet" onclick="deletefunc(${item.id})">Delete</button>
        </div>
            `
                display.appendChild(div)
            })
        })
        .catch((err) => console.log(err))
}
formDisplay()


function deletefunc(id) {
    axios.delete(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`)
        .then(() => formDisplay())

}
async function chngfunc(id) {
    detail.style.display = "block"
    await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`)
        .then((res) => {
            let db = res.data
            detail.innerHTML = `
        <i id="close" class="fa-solid fa-x"></i>
        <div class="d-flex w-100 align-items-center justify-content-center p-3">
        <div class="w-75 mt-4 d-flex justify-content-center flex-column ">
            <h6>Email :</h6>
            <input id="newEmail" type="email" value="${db.email}">
            <h6>Password :</h6>
            <input id="newPassword" type="text" value="${db.password}">
            <button onclick="savenfc(${db.id})">Save</button>
        </div>
     </div>
        `
            let close = document.getElementById("close")
            close.addEventListener("click", closeFunc)
        })
}
function closeFunc() {
    detail.style.display = "none"
}

function savenfc(id) {
    let newEmail = document.getElementById("newEmail");
    let newPassword = document.getElementById("newPassword");

    let data = {
        email: `${newEmail.value}`,
        password: `${newPassword.value}`
    }

    axios.put(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`, data)
        .then(() => formDisplay())
    closeFunc()
}