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
// the function will fetch all employees from the database
const getEmployees = (req, res) => {
  pool.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      data: result.rows,
    });
  });
};

const getEmployeeById = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query('SELECT * FROM employees WHERE "ID"=$1', [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      data: result.rows,
    });
  });
};

// write the function that will update an employee

const updateEmployee = (req, res) => {

  let id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    'UPDATE employees SET name=$1, email=$2 WHERE "ID"=$3',
    [name, email, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ 
        data: "updated employee",
      });
    }
  );
};

const deleteEmployeeById = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query('DELETE FROM employees WHERE "ID"=$1', [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      msg: `Employee delete with the ID ${id}`
    });
  });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployeeById
};
