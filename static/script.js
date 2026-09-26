let modal = document.querySelector(".modal")
modal.style.display = "none"

document.querySelector(".open").addEventListener("click", ()=> modal.style.display = "block")
document.querySelector(".close").addEventListener("click", ()=> modal.style.display = "none")

document.querySelector(".modal form").addEventListener("submit", (event)=> {
    event.preventDefault()
    fetch("/add", {
        method: "POST",
        body: new FormData(event.target)
    }).then(()=>location.reload())
})

// let wrapper = document.querySelector(".wrapper")
// fetch("/posts").then(res => res.json()).then(data=>{
//     data.forEach(post=> {
//         wrapper.innerHTML += `
//             <div class="ad">
//                 <h3>${post.title}</h3>
//                 <p>${post.description}</p>
//             </div>
//         `
//     })
// })