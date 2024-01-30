const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    ammount: {
      type: Number,
      required: true,
    },
  
    date: {
      type: Date,
      required: true,
    },
  
    description: {
      type: String,
      required: true,
    },
  });
  
  const Transaction = mongoose.model("Transactions", TransactionSchema);
  
  module.exports = Transaction;
