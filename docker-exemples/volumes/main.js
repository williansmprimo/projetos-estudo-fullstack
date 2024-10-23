express = require("express")
app = express()
fs = require('fs');

app.get("/file", (req, res) => {
    fs.readFile('./files/file.txt', {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            res.status(404).send("no file")
            return
        }
        res.send(data)
    })
})

app.post("/file", (req, res) => {
    fs.writeFile('./files/file.txt', 'hello file', (err) => {
        if(err){
            res.status(404).send("cant create file")
            return
        }
        res.send("saved")
    })
})

port = process.env.PORT | 8080
app.listen(port)