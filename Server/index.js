const express = require("express");
const cors = require("cors")
const app = express();
const routes = require("./routes/index")

require("dotenv").config()


app.use(express.json());
app.use(cors())
app.use("/api", routes);


app.get("/", (req, res) => {
  res.send("Server Up");
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
