const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const companyRoutes = require("./Routes/company");
const jobRoutes = require("./Routes/job");
const { authMiddleware } = require("./Middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(authMiddleware);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", authMiddleware, companyRoutes);
app.use("/api/jobs", authMiddleware, jobRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://0.0.0.0:27017/jobifyDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err));
