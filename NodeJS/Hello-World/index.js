const express = require("express")

const app = express();

app.get("/hello",(req,res) => res.send("Hello World! this is nishant"))

app.listen(3500,() => {
    console.log("this app is running on port 3500");
})