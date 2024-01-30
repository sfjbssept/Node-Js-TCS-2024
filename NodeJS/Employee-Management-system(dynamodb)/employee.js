const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  host: "localhost",
  database: "employeedb",
  password: process.env.password,
  port: 5434,
});

const createEmployee = (req, res) => {
  const { name, email } = req.body;
  pool.query(
    "INSERT INTO employees (name,email) VALUES($1,$2) RETURNING *",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(200).json({
        message: "Employee added sucessfully",
        data: result.rows[0],
      });
    }
  );
};

module.exports = {
    createEmployee
}
