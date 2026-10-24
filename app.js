const express = require("express")
const multer = require("multer")
const path = require("path")
const db = require("./db")



const app = express()

app.use(express.static("static"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set("views", "views")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.use("/uploads", express.static("uploads"))

let posts = []

app.get("/", (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        result.forEach(post => {
            post.image = post.image != "" ? JSON.parse(post.image) : null
        })
        res.render("index", { posts: result })
    })
})

app.post("/add", upload.fields([{ name: "image" }]), (req, res) => {
    let data = req.body
    if (req.files.image) data.image = req.files.image.map(file => file.filename)
    data.image = data.image ? JSON.stringify(data.image) : ""

    db.query("INSERT INTO posts SET ?", data, (err) => {
        if (err) {
            console.log(err.message)
            res.status(500)
            res.send()
            return
        }
        res.status(201)
        res.send()
    })
})


app.get("/post/:id", (req, res) => {
    const postId = Number(req.params.id)

    db.query(`
        SELECT p.*, c.id AS commentId, c.author, c.comment FROM posts AS p 
        LEFT JOIN comments AS c
        ON c.post_id = p.id
        WHERE p.id = ?
        `, postId, (err, result) => {
        if (err || result.length === 0) {
            res.status(404)
            res.render("notfound")
            return
        }
        let post = result[0]
        console.log(result)
        post.image = post.image != "" ? JSON.parse(post.image) : null
        res.render("post", { post, comments: result })
    })


})

app.post("/comment", (req, res) => {
    console.log(req.body)
    db.query("INSERT INTO comments SET ?", req.body, (err) => {
        if(err) console.log(err.message)
        res.status(201)
        res.end();
    })
})

app.use((req, res, next) => {
    res.status(404)
    res.render("notfound")
})


app.listen(3000, () => console.log("Server on!"))