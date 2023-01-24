const express = require('express');
const parser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

var items = ["Ajouter des items"];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(parser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    var day = today.toLocaleDateString("fr-FR", options);
    res.render('list', {kindOfDay: day, newListItems: items});
})

app.post('/', (req, res)=> {
    var item = req.body.newItem;
    items.push(item);
    //console.log(item);
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})
