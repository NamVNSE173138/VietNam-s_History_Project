const express = require("express");
const app = express();
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const config = {
  server: "WUAVANN5076\\MSSQLSERVER01",
  database: "prj301",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/api/students", cors(corsOptions), (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database connection error" });
    }
    const request = new sql.Request();
    request.query("select * from student", (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error executing query" });
      }
      res.json(result.recordset); // Send the fetched data back to the client
    });
  });
});

const port = 3001; // Use a different port than the React app (localhost:3000)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
