const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  pdfUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Report || mongoose.model("Report", reportSchema);