const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"], // Add PATCH to the allowed methods
  })
);
//app.use(bodyParser.urlencoded({ extended: false }));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "dairy",
  connectionLimit: 10,
});

// Use a function to execute the query with a promise
const executeQuery = (query, values = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const GetDairyEntriesbyUserID = async (req, res) => {
  try {
    const userID = req.params.id * 1;
    const query = `select * from dairy where UserID=${userID} order by ID desc;`;
    const dairies = await executeQuery(query);
    if (dairies.length > 0) {
      //console.log("entered");
      dairies.forEach((dairy) => {
        //console.log(dairy.DairyDate);
        //dairy.DairyDate = new Date(dairy.DairyDate).toISOString();
        const storedDate = new Date(dairy.DairyDate);

        // Calculate the time zone offset for Indian Standard Time (IST)
        const indianTimeZoneOffset = 330; // 5 hours and 30 minutes in minutes

        // Convert the UTC date to Indian Standard Time
        const indianTimeZoneDate = new Date(
          storedDate.getTime() + indianTimeZoneOffset * 60000
        );

        const formattedDate = indianTimeZoneDate.toISOString().split("T")[0];
        // Update the dairy object with the formatted date
        dairy.DairyDate = formattedDate;

        //console.log(formattedDate);
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        dairies,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const GetDairyEntriesbyUserIDandDairyID = async (req, res) => {
  try {
    const userID = req.params.id * 1;
    const dairyID = req.params.dairyID * 1;

    const query = `select * from dairy where UserID=${userID} and ID=${dairyID};`;
    const dairies = await executeQuery(query);
    if (dairies.length > 0) {
      //console.log("entered");
      dairies.forEach((dairy) => {
        //console.log(dairy.DairyDate);
        //dairy.DairyDate = new Date(dairy.DairyDate).toISOString();
        const storedDate = new Date(dairy.DairyDate);

        // Calculate the time zone offset for Indian Standard Time (IST)
        const indianTimeZoneOffset = 330; // 5 hours and 30 minutes in minutes

        // Convert the UTC date to Indian Standard Time
        const indianTimeZoneDate = new Date(
          storedDate.getTime() + indianTimeZoneOffset * 60000
        );

        const formattedDate = indianTimeZoneDate.toISOString().split("T")[0];
        // Update the dairy object with the formatted date
        dairy.DairyDate = formattedDate;

        //console.log(formattedDate);
      });
      res.status(200).json({
        status: "Success",
        hasID: true,
        data: {
          dairies,
        },
      });
    } else {
      res.status(200).json({
        status: "Success",
        hasID: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",

      message: err.message,
    });
  }
};

const GetDairyEntriesbyDate = async (req, res) => {
  try {
    const userID = req.params.id * 1;
    const query = `select * from dairy where UserID=${userID} && DairyDate="${req.params.dairydate}" order by ID desc;`;
    const dairies = await executeQuery(query);
    if (dairies.length > 0) {
      //console.log("entered");
      dairies.forEach((dairy) => {
        //console.log(dairy.DairyDate);
        //dairy.DairyDate = new Date(dairy.DairyDate).toISOString();
        const storedDate = new Date(dairy.DairyDate);

        // Calculate the time zone offset for Indian Standard Time (IST)
        const indianTimeZoneOffset = 330; // 5 hours and 30 minutes in minutes

        // Convert the UTC date to Indian Standard Time
        const indianTimeZoneDate = new Date(
          storedDate.getTime() + indianTimeZoneOffset * 60000
        );

        const formattedDate = indianTimeZoneDate.toISOString().split("T")[0];
        // Update the dairy object with the formatted date
        dairy.DairyDate = formattedDate;

        //console.log(formattedDate);
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        dairies,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const GetUserbyDetails = async (req, res) => {
  //console.log(req);
  try {
    const query = `SELECT * FROM users where UserName = "${req.body.UserName}" and UserPassword= "${req.body.UserPassword}" `;
    //console.log(query);
    const users = await executeQuery(query);

    if (users.length > 0) {
      res.status(200).json({
        status: "Success",
        hasUser: true,
        data: {
          users,
        },
      });
    } else {
      res.status(200).json({
        status: "Success",
        hasUser: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const CreateUser = async (req, res) => {
  //console.log(req);
  try {
    const checkUserQuery = `select  count(*) as count from users where UserName ='${req.body.UserName}'`;
    const usercount = await executeQuery(checkUserQuery);

    if (usercount[0].count > 0) {
      res.status(200).json({
        status: "Failed",
        message: "UserName already exists!...",
      });
    } else {
      const query = `Insert into users (PhoneNo, FirstName, LastName, UserName, Email, UserPassword) values
    ("${req.body.PhoneNo}", "${req.body.FirstName}", "${req.body.LastName}", "${req.body.UserName}", "${req.body.Email}","${req.body.UserPassword}"); `;

      const users = await executeQuery(query);

      if (users.affectedRows === 1) {
        const query1 = `select * from users where userid=${users.insertId}`;
        const userData = await executeQuery(query1);
        res.status(200).json({
          status: "Success",
          hasUser: true,
          data: {
            userData,
          },
        });
      } else {
        res.status(200).json({
          status: "Failed",
          hasUser: false,
        });
      }
    }
  } catch (err) {
    res.status(200).json({
      status: "Error",
      message: err.message,
    });
  }
};

const CreateDairyEntry = async (req, res) => {
  try {
    const query = `Insert into dairy (Entry, DairyDate, UserID) values ("${req.body.dairyData}", "${req.body.dairyDate}" , ${req.body.userID})`;

    const users = await executeQuery(query);

    if (users.affectedRows === 1) {
      res.status(200).json({
        status: "Success",
        message: "Dairy Entry created Successfully",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "Error",
      message: err.message,
    });
  }
};

const EditDairybyID = async (req, res) => {
  try {
    const ID = req.params.id * 1;

    const query = `update dairy set entry="${req.body.dairyData}" where id=${ID};`;

    const users = await executeQuery(query);

    if (users.affectedRows === 1) {
      res.status(200).json({
        status: "Success",
        message: "Dairy Entry updated Successfully",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "Error",
      message: err.message,
    });
  }
};

const DeleteDairyEntrybyID = async (req, res) => {
  try {
    const dairyID = req.params.id * 1;
    const query = `delete from dairy where id=${dairyID}`;

    const users = await executeQuery(query);

    if (users.affectedRows === 1) {
      res.status(200).json({
        status: "Success",
        message: "Dairy Entry deleted Successfully",
      });
    }
  } catch (err) {
    res.status(200).json({
      status: "Error",
      message: err.message,
    });
  }
};

app.route("/api/v1/dairy/:id").delete(DeleteDairyEntrybyID); //Deleting Dairy Entry
app.route("/api/v1/users").post(GetUserbyDetails); //Used in login to get user details
app.route("/api/v1/signup").post(CreateUser); //Used in Signup
app.route("/api/v1/dairy").post(CreateDairyEntry); //Used in New Entry
app.route("/api/v1/dairy/:id").get(GetDairyEntriesbyUserID); //Get all diaries for user
app.route("/api/v1/dairy/:id/:dairyID").get(GetDairyEntriesbyUserIDandDairyID); //Editing entry by userid and dairyID
app.route("/api/v1/dairy/:id/:dairydate").get(GetDairyEntriesbyDate);
app.route("/api/v1/dairy/:id").put(EditDairybyID);

const port = 3305;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
