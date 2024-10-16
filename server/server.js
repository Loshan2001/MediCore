const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require("body-parser");

dotenv.config();


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Front-end origin
}));

app.use(bodyParser.json());


const authRoutes = require("./routes/userRoute"); 
const appointmRoute = require("./routes/appointmentRoute")
const doctorRoute = require("./routes/doctorRoute")
const hospitalRoute = require("./routes/hospitalRoute")
const bookingRoute = require("./routes/bookingRoute")
app.use("/api/user", authRoutes);
app.use("/api/appointment",appointmRoute)
app.use("/api/doctor",doctorRoute)
app.use("/api/hospital",hospitalRoute)
app.use("/api/booking", bookingRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
