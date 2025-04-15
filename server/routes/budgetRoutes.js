const express = require("express");
router = express.Router();
const Budget = require("../models/Budget");

router.post("/create-budget", async (req, res) => {
  try {
    const { category, month, amount } = req.body;
    // console.log(req.body)
    if (!category || !month || typeof amount !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }

    const existing = await Budget.findOne({ category, month });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.status(200).json(existing);
    }

    const newBudget = await Budget.create({ category, month, amount });
    return res.status(201).json({
      success: true,
      newBudget,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meesage: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Month is required" });

    const budgets = await Budget.find({ month });
    res.status(200).json({
      success: true,
      budgets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      meesage: error.message,
    });
  }
});

module.exports = router
