import express from "express";

const router = express.Router();


import { FraudDetector } from "../services/fraudDetector.js";

router.post("/analyze", async (req, res) => {
  try {
    const transactions = req.body.transactions;

    const detector = new FraudDetector();

    // ✅ STEP 4 GOES HERE
    const start = Date.now();

    detector.processTransactions(transactions);

    const end = Date.now();

    const report = detector.generateReport((end - start) / 1000);

    res.json(report);
  } catch (error) {
    res.status(500).json({
      error: "Fraud analysis failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export { router as analysisRouter };