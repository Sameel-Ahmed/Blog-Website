import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];
posts.splice(0, 1);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/new", (req, res) => {
    res.render("post.ejs");
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    res.render("edit.ejs", { post: post, id: postId });
});

app.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    posts[postId].title = req.body.title;
    posts[postId].content = req.body.content;
    res.redirect('/');
});

app.post("/new", (req, res) => {
    const newPost = { 
        title: req.body["title"],
        content: req.body["content"],
        date: new Date().toLocaleString()
    }
    posts.push(newPost);
    res.redirect("/");
});

app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts.splice(postId, 1); // Remove the post from the array
    res.redirect('/'); // Redirect back to the home page
});

app.delete("/")

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});