const Finances = require("../models/FinancesSchema");

exports.addFinances = async (req, res) => {
  try {
    const { savings_ammount, cash_in_hand, account_ammount } = req.body;

    if (!savings_ammount || !cash_in_hand || !account_ammount) {
      console.log(req.body);

      return res.status(400).json({ message: "please input required fields" });
    }

    const newFinances = Finances({
      saving_ammount: req.body.savings_ammount,
      account_ammount: req.body.account_ammount,
      cash_in_hand: req.body.cash_in_hand,
      user: req.user._id,
    });

    const finance = await newFinances.save();

    return res.status(200).json(finance);
  } catch (error) {
    res.status(400).json({ error_mesaage: error.message });
    console.log(error);
  }
};
