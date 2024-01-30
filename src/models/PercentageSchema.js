const mongoose = require("mongoose");

const PercentageSchema = mongoose.Schema({
  allocation_amount: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

Percentage = mongoose.model("Percentage", PercentageSchema);

module.exports = Percentage;
