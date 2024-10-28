import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

let informations = [];
let infoID = 1;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(methodOverride('_method'));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: informations});
})

app.get("/create", (req, res) => {
    res.render("createBlog.ejs");
})

app.post("/create", (req, res) => {
    res.render("createBlog.ejs");
})

app.post("/submit", (req, res) => {
    const { title, info } = req.body;
    const newInfo = {
        id: infoID++,
        title,
        info
    }
    informations.push(newInfo);
    res.redirect("/");
})

app.get("/edit/:id", (req, res) => {
    const infoId = parseInt(req.params.id);
    const info = informations.find(i => i.id === infoId);

    if(!info){
        return res.status(404).send("Info Not Found!!!");
    }
    res.render("editBlog.ejs", { content: info});
})

app.put("/info/:id", (req, res) => {
    const infoId = parseInt(req.params.id);
    const info = informations.find(i => i.id === infoId);

    if(!info){
        return res.status(404).send("Info Not Found!!!");
    }

    info.title = req.body.title;
    info.info = req.body.info;

    res.redirect("/");
})

app.delete("/delete/:id", (req, res) => {
    const infoId = parseInt(req.params.id);

    informations = informations.filter(i => i.id !== infoId);

    // can be done this way too
    // informations.pop(i => i.id == infoId);
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});