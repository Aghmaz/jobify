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
  console.log(req.params.id, "update");
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json(company);
});

// Update company
router.put("/:id", async (req, res) => {
  try {
    const { name, address, contactEmail } = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { name, address, contactEmail },
      { new: true } // Return the updated document
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete company
router.delete("/:id", async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
