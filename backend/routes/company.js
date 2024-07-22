const express = require("express");
const Company = require("../Model/company");
const router = express.Router();

// Create a company
router.post("/", async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.status(201).json(company);
});

// Get list of companies with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const companies = await Company.find()
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(companies);
});

// Get company details
router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json(company);
});

module.exports = router;
