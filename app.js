const express = require("express")

const app = express()

app.use(express.static("static"))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")


let posts = []

app.get("/", (req, res) => {
    res.render("index", { posts })
})

app.post("/add", (req, res)=>{
    let data = req.body
    posts.push(data)
    console.log(data)
    res.status(200)
    res.send()
})

app.get("/posts", (req, res)=>{
    res.status(200)
    res.setHeader("content-type", "application/json")
    res.json(posts)
})

app.use((req, res, next) => {
    res.status(404)
    res.render("notfound")
})


app.listen(3000, ()=>console.log("Server on!"))