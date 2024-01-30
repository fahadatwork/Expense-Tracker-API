const Percentage = require("../models/PercentageSchema");
const { ValidatePercentage } = require('../utils/validators')

addPercentage = async (req, res) => {
  try {
    const { allocation_ammount } = req.body;

    if (!allocation_ammount) {
      return res
        .status(400)
        .json({ error_message: "No allocation ammount specified" });
    }

    if(!ValidatePercentage(Number(allocation_ammount))){

      return res.status(400).json({
        error_message : "Percentage should be 0 - 100 only"
      })
    }

    const newPercentage = Percentage({
      allocation_amount : allocation_ammount,
      user: req.user._id,
    });

    await newPercentage.save();

    return res.status(201).json(newPercentage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_message: "Interal Server Error" });
  }
};


module.exports = addPercentage
