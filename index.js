require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/routUser.js");
const getHeaderToken = require("./middleware/authenticationMiddle.js");
const routerProject = require("./routes/projetRouter.js");
const routeinvest = require("./routes/investRouter.js");
const routeCrud = require("./routes/investRouter.js");


const app = express();

// connect database
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api", userRoutes);
app.use("/project" ,routerProject);

app.use("/invest",routeinvest);
app.use("/get",routeCrud )




// app.get("/test", getHeaderToken, (req, res) => {
//   res.status(200).json({
//     user: req.user,
//     message: "djflksdjkfljlk",
//   });
// });


// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
