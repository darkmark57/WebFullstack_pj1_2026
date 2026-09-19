let modal = document.querySelector(".modal")
modal.style.display = "none"

document.querySelector(".open").addEventListener("click", ()=> modal.style.display = "block")
document.querySelector(".close").addEventListener("click", ()=> modal.style.display = "none")

document.querySelector(".modal form").addEventListener("submit", (event)=> {
    event.preventDefault()
    let data = {
        title: event.target["title"].value,
        description: event.target["description"].value
    }
    fetch("/add", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
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