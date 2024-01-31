const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = 5000;
const dbEmp = require("./employee")

app.use(express.json());

//home endpoint
app.get("/",(req,res) => {
    res.send("hello from express JS");
})

app.post("/add",dbEmp.createEmployee)

app.get("/allemp",dbEmp.getEmployees)

app.get("/:id" , dbEmp.getEmployeeById);

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
