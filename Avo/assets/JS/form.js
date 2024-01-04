let form = document.getElementById("form");
let email = document.getElementById("email");
let display = document.getElementById("display");
let detail = document.getElementById("formDetail");
let pass = document.getElementById("pass");
form.addEventListener("submit",getForm)

function getForm(e){
    e.preventDefault()
    let data={
        email:`${email.value}`,
        password:`${pass.value}`
    }
    axios.post("https://655f2b37879575426b44b8f7.mockapi.io/basket",data)
    .then(() => {
        dispFunc()
        form.reset()
    })
    .catch((err) => console.log(err))

}


async function dispFunc(){  
    display.innerHTML=''
    await axios.get("https://655f2b37879575426b44b8f7.mockapi.io/basket")
    .then(res =>{
        let db = res.data
        db.forEach((item) =>{
            let div = document.createElement("div")
            div.className='formBox'
            div.innerHTML=`
            <p><h6>Email: </h6>${item.email}</p>
            <h6>Password</h6>
            <input type="password" value="${item.password}">
            <button class="chng" onclick="chngFunc(${item.id})">Change</button>
            <button class="rmv" onclick="rmvFunc(${item.id})">Remove</button>
            `
            display.appendChild(div)
        })
    }) 
    .catch((err) => console.log(err))
}
dispFunc()

function rmvFunc(id){
    axios.delete(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`)
    .then(() => dispFunc())
    .catch((err) => console.log(err))
}
async function chngFunc(id){
detail.style.display="flex"
  await axios.get(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`)
  .then((res) =>{
     let  formset = res.data
      console.log(formset);
    detail.innerHTML=`
    <i id="close" class="fa-solid fa-x"></i>
    <div class="d-flex flex-column justify-content-center align-items-center">
    <label for="newEmail"><h6>Email</h6></label>
    <input id="newEmail" type="email" value="${formset.email}" required>
    <label for="newpass"><h6>Password</h6></label>
    <input id="newpass" type="text" value="${formset.password}">
    <button id="save" onclick="saveFunc(${formset.id})">Save</button>
    </div>
        `
  })
  .catch((err) => console.log(err))

  document.getElementById("close").addEventListener("click", closeFunc)
}
function closeFunc(){
    detail.style.display="none"
    detail.innerHTML=""
}
function saveFunc(id){
    let newEmail = document.getElementById("newEmail")
    let newpass = document.getElementById("newpass")
    let data={
        email:`${newEmail.value}`,
        password:`${newpass.value}`
    }
    axios.put(`https://655f2b37879575426b44b8f7.mockapi.io/basket/${id}`,data)
    .then(() => {
        dispFunc()
        closeFunc()
    })
}