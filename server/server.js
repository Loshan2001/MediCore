const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Front-end origin
}));

app.use(bodyParser.json());

const authRoutes = require("./routes/userRoute"); 
const appointmRoute = require("./routes/appointmentRoute")
const doctorRoute = require("./routes/doctorRoute")
app.use("/api/user", authRoutes);
app.use("/api/appointment",appointmRoute)
app.use("/api/doctor",doctorRoute)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
