const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require("body-parser");

dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/userRoute"); 
const appointmRoute = require("./routes/appointmentRoute")
app.use("/api/user", authRoutes);
app.use("/api/appointment",appointmRoute)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
