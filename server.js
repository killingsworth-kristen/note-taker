// pulling in required packages/files
const express = require(`express`);
const path = require(`path`)
const fs = require(`fs`);


// instantiating express & creating port
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/notes`, (req, res) => {
    res.sendFile(path.join(__dirname,`./public/notes.html`));
});

app.get(`/api/notes`, (req, res) => {
    res.json(require(`./db/db.json`));
});



app.post(`/api/notes`, (req, res) => {
    fs.readFile(`./db/db.json`, (err, data) => {
            if (err) {
                throw err;
            } 
            console.log(data)
            const oldData = JSON.parse(data)
            console.log(oldData)
            console.log(req.body)
            const newData = req.body
            oldData.push(newData)
            console.log(oldData)
        fs.writeFile(`./db/db.json`,`${JSON.stringify(oldData)}`, (err) => {
            if (err) {
                console.log(err)
                throw err;
            } 
            console.log('Data was added to JSON file');
            });
    }).then((result)=>{
        console.log(result)
        res.json(require(`./db/db.json`))
        console.log(` this is the updated json ${res.json(require(`./db/db.json`))}`)
    })
    
});

app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname,`./views/index.html`));
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
