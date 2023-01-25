const express = require('express');
const parser = require('body-parser');
const PORT = process.env.PORT || 3000;
const date = require(__dirname + "/date.js") //as the module is local (and not install via npm) __dirname + "/date.js"

const app = express();

let items = ["Ajouter des items"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    let day = date.getDate();

    res.render('list', {listTitle: day, newListItems: items});
})

app.get('/work', (req, res)=>{
    res.render('list', {listTitle: "work list", newListItems: workItems});
})

app.get('/about', (req, res)=>{
    res.render('about');
})

app.post('/', (req, res)=> {
    let item = req.body.newItem;
    console.log(req.body);
    if (req.body.list === "work"){
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');}

    // items.push(item);
    // //console.log(item);
    // res.redirect('/');
})

// app.post('/work', (req, res) => {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work');
// })

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})
