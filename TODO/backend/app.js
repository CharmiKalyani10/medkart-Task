const express = require("express");
const app = express();
const cors = require("cors")
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(cors())
app.use(express.json());

app.use("/api/v1", auth);
app.use("/api/v2", list);


app.get("/", (req, res) => {
  res.send("Hello Server is Started");
});

app.listen(8000, () => {
  console.log("Server Started at port 8000");
});
