const Finances = require("../models/FinancesSchema");

const calculatePercentage = (x, y) => {
  if (x < 0 || x > 100) {
    throw new Error("Percentage value must be between 0 and 100");
  }

  const result = (x / 100) * y;

  return result;
};

exports.BalanceUpdate = async (
  percentage,
  cash_in_hand,
  account_ammount,
  user_id
) => {
  const bal_from_account = calculatePercentage(percentage, account_ammount);
  const bal_from_cash = calculatePercentage(percentage, cash_in_hand);

  const result = (percentage / 100) * (bal_from_account + bal_from_cash);

  let newFinances = await Finances.findOne({ user: user_id });

  if (newFinances) {
    let updatedCashInHand = newFinances.cash_in_hand - bal_from_cash;
    let updatedAccountAmount = newFinances.account_ammount - bal_from_account;

    updatedCashInHand = updatedCashInHand < 0 ? 0 : updatedCashInHand;
    updatedAccountAmount = updatedAccountAmount < 0 ? 0 : updatedAccountAmount;

    newFinances = await Finances.findOneAndUpdate(
      { user: user_id },
      {
        $inc: {
          savings_account: result,
          cash_in_hand: updatedCashInHand - newFinances.cash_in_hand,
          account_ammount: updatedAccountAmount - newFinances.account_ammount,
        },
      },
      { new: true }
    );
  }

  console.log(`balance Adjusted for user ${user_id}`);

  return result;
};
