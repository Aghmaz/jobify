const express = require("express");
const Job = require("../Model/job");
const router = express.Router();

// Create a job
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

// Get list of jobs with pagination
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const jobs = await Job.find()
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(jobs);
});

// Update a job
router.put("/:id", async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

// Delete a job
router.delete("/:id", async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.status(204).end();
});

module.exports = router;
