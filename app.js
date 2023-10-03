import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

let items = []; //empty array for today items list
let workItems = []; //empty array for work litems ist


//correct format for date to print 
function getDate () {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    return today.toLocaleDateString("fr-FR", options);
}

// function getHours (){
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();
//     const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
//     return `${hours} : ${minutes}`;
 
// }


let day = getDate();



app.get('/maison', (req, res) => {
    res.render('list.ejs', {listTitle: "Maison", newListItems: items, todayDate: day });
})

app.get('/work', (req, res)=>{
    res.render('list.ejs', {listTitle: "Travail", newListItems: workItems, todayDate: day });
})

app.get('/about', (req, res)=>{
    res.render('about.ejs');
})

app.post("/", (req, res)=> {
    let item = req.body.newItem;
    console.log(item);
    if (req.body.list === "Travail") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/maison');
    }

    // if (req.body.delete == "work") {
    //     workItems.pop(item);
    //     res.redirect('/work');
    // } else {
    //     items.pop(item);
    //     res.redirect('/)');
    // }
})

// app.post('/work', (req, res) => {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect('/work');
// })

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})
